/**
 * ===============================================
 * CREATIVE HUT WEBSITE - PROPIEDAD INTELECTUAL
 * ===============================================
 * 
 * Desarrollado por: Ing. José Ríler Solórzano Campos
 * Empresa: DEVIT506
 * Website: www.devit506.net
 * Fecha: 28 de julio de 2025
 * 
 * © 2025 José Ríler Solórzano Campos - DEVIT506
 * Todos los derechos reservados.
 * 
 * Este código es propiedad intelectual exclusiva del 
 * desarrollador y no puede ser reproducido, distribuido
 * o modificado sin autorización expresa por escrito.
 * ===============================================
 */

/**
 * @fileoverview Envío SMTP del formulario de contacto, aislado del export estático.
 * @description No es una ruta de App Router. Vive fuera de src/app para que
 * `next build` con output: 'export' no intente publicarla. El sitio estático
 * abre un mailto en el navegador. Este módulo se reutiliza cuando haya Node
 * (Vercel): crear src/app/api/send-email/route.ts con
 *
 *   import { NextRequest } from 'next/server';
 *   import { handleContactEmailPost } from '@/server/email/contact-mailer';
 *   export const runtime = 'nodejs';
 *   export function POST(request: NextRequest) {
 *     return handleContactEmailPost(request);
 *   }
 *
 * Variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, SMTP_TO.
 * Esquema único en .env.example. Host por defecto smtp.office365.com:587 (STARTTLS).
 * 
 * @module ContactMailer
 * @version 2.0.0 - Versión con mitigaciones de seguridad OWASP
 * @author José Ríler Solórzano Campos <web@creativehutcr.com>
 * @company DEVIT506 - www.devit506.net
 * @since 2025-07-28
 * 
 * @requires next/server - Framework Next.js para manejo de requests/responses
 * @requires nodemailer - Librería para envío de emails vía SMTP
 * @requires validator - Validación de datos
 * @requires isomorphic-dompurify - Sanitización XSS
 * 
 * @security
 * ✅ Sanitización XSS implementada
 * ✅ Validación robusta de inputs
 * ✅ TLS 1.2+ configurado
 * ✅ Rate limiting básico
 * ✅ Validación de variables de entorno
 * ✅ Logging seguro
 */

// ============================================================================
// IMPORTS - Dependencias externas del framework y librerías
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import validator from 'validator';
import DOMPurify from 'isomorphic-dompurify';

// ============================================================================
// INTERFACES - Definición de tipos para el formulario
// ============================================================================

interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  consent?: boolean;
}

interface ServiceMapping {
  [key: string]: string;
}

interface ValidationResult {
  valid: boolean;
  error?: string;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// ============================================================================
// CONSTANTES - Configuración del sistema
// ============================================================================

const SERVICE_NAMES: ServiceMapping = {
  'publicidad-digital': 'Publicidad Digital',
  'marketing-digital': 'Marketing Digital', 
  'produccion-digital': 'Producción Digital',
  'eventos': 'Eventos',
  'desarrollo': 'Desarrollo',
  'otro': 'Otro'
};

// Límites de validación
const MAX_LENGTHS = {
  fullName: 100,
  email: 254,
  phone: 20,
  message: 5000,
  service: 50
};

// Rate limiting: 5 requests por hora por IP
const RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 60 * 60 * 1000, // 1 hora
};

// Cache simple en memoria para rate limiting (en producción usar Redis)
const rateLimitCache = new Map<string, RateLimitEntry>();

// ============================================================================
// FUNCIONES DE SEGURIDAD
// ============================================================================

/**
 * Sanitiza HTML para prevenir XSS
 */
function sanitizeHtml(str: string): string {
  return DOMPurify.sanitize(str, { 
    ALLOWED_TAGS: [],  // No permitir HTML
    ALLOWED_ATTR: [] 
  });
}

/**
 * Escapa caracteres especiales para atributos HTML
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Valida variables de entorno requeridas
 */
function validateEnvVars(): void {
  const required = ['SMTP_USER', 'SMTP_PASSWORD', 'SMTP_FROM', 'SMTP_TO'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Variables de entorno faltantes: ${missing.join(', ')}`);
  }
  
  // Validar formato de emails
  if (!validator.isEmail(process.env.SMTP_FROM || '')) {
    throw new Error('SMTP_FROM no es un email válido');
  }
  
  if (!validator.isEmail(process.env.SMTP_TO || '')) {
    throw new Error('SMTP_TO no es un email válido');
  }
  
  // Validar que SMTP_USER sea un email válido
  if (!validator.isEmail(process.env.SMTP_USER || '')) {
    throw new Error('SMTP_USER no es un email válido');
  }
}

/**
 * Valida y sanitiza los datos del formulario
 */
function validateInput(data: ContactFormData): ValidationResult {
  // Validar campos requeridos (ya validados antes, pero double-check)
  if (!data.fullName || !data.email || !data.message) {
    return { valid: false, error: 'Nombre, email y mensaje son requeridos' };
  }
  
  // Normalizar strings (trim)
  const normalizedFullName = data.fullName.trim();
  const normalizedEmail = data.email.trim();
  const normalizedMessage = data.message.trim();
  
  // Validar que no estén vacíos después de trim
  if (normalizedFullName.length === 0) {
    return { valid: false, error: 'El nombre no puede estar vacío' };
  }
  
  if (normalizedEmail.length === 0) {
    return { valid: false, error: 'El email no puede estar vacío' };
  }
  
  if (normalizedMessage.length === 0) {
    return { valid: false, error: 'El mensaje no puede estar vacío' };
  }
  
  // Validar longitud
  if (normalizedFullName.length > MAX_LENGTHS.fullName) {
    return { valid: false, error: `Nombre demasiado largo (máximo ${MAX_LENGTHS.fullName} caracteres)` };
  }
  
  if (normalizedMessage.length > MAX_LENGTHS.message) {
    return { valid: false, error: `Mensaje demasiado largo (máximo ${MAX_LENGTHS.message} caracteres)` };
  }
  
  if (normalizedMessage.length < 5) {
    return { valid: false, error: 'El mensaje debe tener al menos 5 caracteres' };
  }
  
  // Validar formato de email
  if (!validator.isEmail(normalizedEmail)) {
    return { valid: false, error: 'Email inválido. Por favor, verifica el formato del email.' };
  }
  
  // Validar teléfono si existe
  if (data.phone && data.phone.trim().length > 0) {
    const normalizedPhone = data.phone.trim();
    if (normalizedPhone.length > MAX_LENGTHS.phone) {
      return { valid: false, error: `Teléfono demasiado largo (máximo ${MAX_LENGTHS.phone} caracteres)` };
    }
    // Validar formato básico de teléfono (permite +, números, espacios, guiones, paréntesis)
    if (!/^[\d\s\+\-\(\)]+$/.test(normalizedPhone)) {
      return { valid: false, error: 'Teléfono contiene caracteres inválidos. Solo se permiten números, espacios, +, -, y paréntesis.' };
    }
  }
  
  // Validar nombre (solo letras, espacios, acentos y algunos caracteres especiales)
  // Permitir nombres más flexibles
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-'\.]+$/.test(normalizedFullName)) {
    return { valid: false, error: 'El nombre contiene caracteres inválidos. Solo se permiten letras, espacios, guiones y apóstrofes.' };
  }
  
  // Validar servicio contra lista blanca
  if (data.service && data.service.trim().length > 0) {
    const normalizedService = data.service.trim();
    if (normalizedService.length > MAX_LENGTHS.service) {
      return { valid: false, error: 'Servicio inválido' };
    }
    if (!SERVICE_NAMES[normalizedService]) {
      return { valid: false, error: 'Servicio seleccionado no es válido' };
    }
  }
  
  return { valid: true };
}

/**
 * Rate limiting básico (en producción usar Redis)
 */
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitCache.get(ip);
  
  // Limpiar entradas expiradas
  if (entry && entry.resetTime < now) {
    rateLimitCache.delete(ip);
  }
  
  const currentEntry = rateLimitCache.get(ip);
  
  if (!currentEntry) {
    // Primera solicitud
    rateLimitCache.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs
    });
    return { allowed: true, remaining: RATE_LIMIT.maxRequests - 1 };
  }
  
  if (currentEntry.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, remaining: 0 };
  }
  
  // Incrementar contador
  currentEntry.count++;
  rateLimitCache.set(ip, currentEntry);
  
  return { allowed: true, remaining: RATE_LIMIT.maxRequests - currentEntry.count };
}

/**
 * Logging seguro (no expone información sensible)
 */
function logEmailAttempt(ip: string, email: string, success: boolean, error?: Error | unknown): void {
  const timestamp = new Date().toISOString();
  const emailMasked = email.substring(0, 3) + '***@' + email.split('@')[1];
  
  if (success) {
    console.log(`[${timestamp}] Email enviado exitosamente - IP: ${ip} - Email: ${emailMasked}`);
  } else {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[${timestamp}] Error enviando email - IP: ${ip} - Email: ${emailMasked} - Error: ${errorMessage}`);
  }
}

// ============================================================================
// API HANDLER - Función principal del endpoint
// ============================================================================

export async function handleContactEmailPost(request: NextRequest) {
  const startTime = Date.now();
  let clientIp = 'unknown';
  
  try {
    // Obtener IP del cliente
    clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Validar variables de entorno
    validateEnvVars();
    
    // Verificar rate limiting
    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor, intenta más tarde.' },
        { status: 429, headers: { 'Retry-After': '3600' } }
      );
    }
    
    // Extraer datos del request
    let requestData: ContactFormData;
    try {
      requestData = await request.json();
    } catch (error) {
      console.error('[API] Error parsing JSON:', error);
      return NextResponse.json(
        { error: 'Formato de datos inválido. Por favor, verifica que todos los campos estén correctamente completados.' },
        { status: 400 }
      );
    }
    
    // Log seguro de los datos recibidos (sin información sensible completa)
    console.log('[API] Datos recibidos:', {
      hasFullName: !!requestData.fullName,
      hasEmail: !!requestData.email,
      hasMessage: !!requestData.message,
      hasPhone: !!requestData.phone,
      hasService: !!requestData.service,
      consent: requestData.consent,
      messageLength: requestData.message?.length || 0
    });
    
    const { fullName, email, phone, service, message, consent } = requestData;
    
    // Validar consentimiento
    if (!consent) {
      console.log('[API] Validación fallida: consentimiento no aceptado');
      return NextResponse.json(
        { error: 'Debes aceptar ser contactado para enviar el formulario' },
        { status: 400 }
      );
    }
    
    // Validar que los campos requeridos existan y no sean solo espacios en blanco
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length === 0) {
      console.log('[API] Validación fallida: nombre vacío o inválido');
      return NextResponse.json(
        { error: 'El nombre es requerido y no puede estar vacío' },
        { status: 400 }
      );
    }
    
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      console.log('[API] Validación fallida: email vacío o inválido');
      return NextResponse.json(
        { error: 'El email es requerido y no puede estar vacío' },
        { status: 400 }
      );
    }
    
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      console.log('[API] Validación fallida: mensaje vacío o inválido');
      return NextResponse.json(
        { error: 'El mensaje es requerido y no puede estar vacío' },
        { status: 400 }
      );
    }
    
    // Normalizar datos (trim) antes de validar
    const normalizedFullName = fullName.trim();
    const normalizedEmail = email.trim();
    const normalizedMessage = message.trim();
    const normalizedPhone = phone ? phone.trim() : '';
    const normalizedService = service ? service.trim() : '';
    
    // Validar y sanitizar inputs
    const validation = validateInput({ 
      fullName: normalizedFullName, 
      email: normalizedEmail, 
      phone: normalizedPhone, 
      service: normalizedService, 
      message: normalizedMessage 
    });
    if (!validation.valid) {
      console.log('[API] Validación fallida:', validation.error);
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }
    
    // Sanitizar datos para HTML (usar versiones normalizadas)
    const sanitizedFullName = sanitizeHtml(normalizedFullName);
    const sanitizedEmail = sanitizeHtml(normalizedEmail);
    const sanitizedPhone = normalizedPhone ? sanitizeHtml(normalizedPhone) : '';
    const sanitizedMessage = sanitizeHtml(normalizedMessage);
    const serviceName = normalizedService ? (SERVICE_NAMES[normalizedService] || 'No especificado') : 'No especificado';
    
    // Escapar para atributos HTML (usar versiones normalizadas)
    const escapedEmail = escapeHtml(normalizedEmail);
    const escapedPhone = escapeHtml(normalizedPhone || '');
    
    // Verificar que las variables de entorno estén configuradas
    const smtpUser = process.env.SMTP_USER?.trim();
    // SMTP_PASSWORD (App Password) puede venir con espacios, remover comillas externas
    const smtpPassword = process.env.SMTP_PASSWORD?.trim().replace(/^"|"$/g, '').trim();
    const smtpFrom = process.env.SMTP_FROM?.trim() || smtpUser;
    const smtpTo = process.env.SMTP_TO?.trim();
    const smtpHost = process.env.SMTP_HOST?.trim() || 'smtp.office365.com';
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    
    if (!smtpUser || !smtpPassword || !smtpFrom || !smtpTo) {
      console.error('[API] ❌ Variables de entorno faltantes o vacías');
      return NextResponse.json(
        { error: 'Error de configuración del servidor. Por favor, contacta al administrador.' },
        { status: 500 }
      );
    }
    
    console.log('[API] Configurando SMTP Office365 con usuario:', smtpUser);
    console.log('[API] Host:', smtpHost, '- Puerto:', smtpPort);
    console.log('[API] Longitud de contraseña de aplicación:', smtpPassword.length, 'caracteres');
    
    // Office 365: puerto 587, secure false y STARTTLS (requireTLS).
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: false, // false para 587 (STARTTLS)
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
      tls: {
        minVersion: 'TLSv1.2', // ✅ TLS 1.2 mínimo
        ciphers: 'HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
        rejectUnauthorized: true, // ✅ Verificar certificado
      },
      // Opciones adicionales para Office 365
      requireTLS: true,
      connectionTimeout: 10000, // 10 segundos
      greetingTimeout: 10000,
    });
    
    // Verificar conexión SMTP (opcional en desarrollo, requerido en producción)
    try {
      console.log('[API] Intentando verificar conexión SMTP...');
      await transporter.verify();
      console.log('[API] ✅ Conexión SMTP verificada correctamente');
    } catch (verifyError) {
      const verifyErrorMsg = verifyError instanceof Error ? verifyError.message : 'Error desconocido';
      const errorCode = verifyError instanceof Error && 'code' in verifyError 
        ? (verifyError as Error & { code?: string }).code || 'NO_CODE'
        : 'NO_CODE';
      
      console.error('[API] ❌ Error verificando conexión SMTP:');
      console.error('[API]   - Mensaje:', verifyErrorMsg);
      console.error('[API]   - Código:', errorCode);
      console.error('[API]   - Stack:', verifyError instanceof Error ? verifyError.stack?.substring(0, 200) : 'N/A');
      
      // En desarrollo, permitir continuar sin verificación (solo para testing)
      // En producción esto debería fallar
      if (process.env.NODE_ENV === 'development') {
        console.warn('[API] ⚠️  Modo desarrollo: Continuando sin verificación SMTP (esto puede fallar al enviar)');
        // No retornar error, continuar con el envío
      } else {
        // En producción, retornar error
        return NextResponse.json(
          { error: 'Error de configuración del servidor de email. Por favor, contacta al administrador.' },
          { status: 500 }
        );
      }
    }
    
    // Construir email con datos sanitizados
    const mailOptions = {
      from: `"Creative Hut" <${smtpFrom}>`,
      replyTo: sanitizedEmail || smtpFrom,
      to: smtpTo,
      subject: `Nuevo contacto desde la web - ${sanitizedFullName}`,
      
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">💌 Nuevo contacto</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Formulario de contacto - Creative Hut</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 25px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #667eea; border-radius: 4px;">
              <h2 style="margin: 0 0 15px 0; color: #333; font-size: 20px;">📋 Información del contacto</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">👤 Nombre:</td>
                  <td style="padding: 8px 0; color: #333;">${sanitizedFullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">📧 Email:</td>
                  <td style="padding: 8px 0; color: #333;"><a href="mailto:${escapedEmail}" style="color: #667eea; text-decoration: none;">${sanitizedEmail}</a></td>
                </tr>
                ${sanitizedPhone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">📱 Teléfono:</td>
                  <td style="padding: 8px 0; color: #333;"><a href="tel:${escapedPhone}" style="color: #667eea; text-decoration: none;">${sanitizedPhone}</a></td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">🎯 Servicio:</td>
                  <td style="padding: 8px 0; color: #333;">${serviceName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">✅ Consentimiento:</td>
                  <td style="padding: 8px 0; color: #28a745; font-weight: 600;">Acepta ser contactado para fines comerciales y de seguimiento</td>
                </tr>
              </table>
            </div>
            
            <div style="margin-bottom: 25px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #28a745; border-radius: 4px;">
              <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">💬 Mensaje</h3>
              <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef; color: #333; line-height: 1.6; white-space: pre-wrap;">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div style="padding: 15px; background-color: #e8f4fd; border-radius: 6px; text-align: center; border: 1px solid #bee5eb;">
              <p style="margin: 0; color: #0c5460; font-size: 14px;">
                📅 <strong>Fecha:</strong> ${new Date().toLocaleString('es-CR', { 
                  timeZone: 'America/Costa_Rica',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })} (Hora de Costa Rica)
              </p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p style="margin: 0;">Este mensaje fue enviado desde el formulario de contacto de creativehutcr.com</p>
          </div>
        </div>
      `,
      
      text: `
        Nuevo contacto desde Creative Hut
        
        Información del contacto:
        - Nombre: ${sanitizedFullName}
        - Email: ${sanitizedEmail}
        ${sanitizedPhone ? `- Teléfono: ${sanitizedPhone}` : ''}
        - Servicio de interés: ${serviceName}
        - Consentimiento: Acepta ser contactado para fines comerciales y de seguimiento
        
        Mensaje:
        ${sanitizedMessage}
        
        Fecha: ${new Date().toLocaleString('es-CR', { 
          timeZone: 'America/Costa_Rica',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })} (Hora de Costa Rica)
      `
    };
    
    // Enviar email
    try {
      await transporter.sendMail(mailOptions);
    } catch (sendError) {
      const sendErrorMsg = sendError instanceof Error ? sendError.message : 'Error desconocido';
      console.error('[API] Error enviando email:', sendErrorMsg);
      // Log del error
      logEmailAttempt(clientIp, normalizedEmail, false, sendError);
      
      // Manejar errores específicos de nodemailer
      if (sendErrorMsg.includes('Invalid login') || sendErrorMsg.includes('authentication')) {
        return NextResponse.json(
          { error: 'Error de configuración del servidor de email. Por favor, contacta al administrador.' },
          { status: 500 }
        );
      }
      
      if (sendErrorMsg.includes('timeout') || sendErrorMsg.includes('ECONNREFUSED')) {
        return NextResponse.json(
          { error: 'Error de conexión con el servidor de email. Por favor, intenta más tarde.' },
          { status: 503 }
        );
      }
      
      // Error genérico de envío
      return NextResponse.json(
        { error: 'Error al enviar el email. Por favor, intenta más tarde.' },
        { status: 500 }
      );
    }
    
    // Log exitoso (usar email normalizado)
    logEmailAttempt(clientIp, normalizedEmail, true);
    
    const duration = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] Request procesado en ${duration}ms`);
    
    return NextResponse.json(
      { message: 'Email enviado exitosamente' },
      { status: 200 }
    );
    
  } catch (error: unknown) {
    // Log seguro del error
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('[API] Error general:', errorMessage);
    logEmailAttempt(clientIp, 'unknown', false, error);
    
    // Si es error de configuración (variables de entorno), retornar 500 sin detalles
    if (errorMessage.includes('Variables de entorno') || errorMessage.includes('EMAIL_') || errorMessage.includes('GMAIL_')) {
      console.error('[API] Error de configuración:', errorMessage);
      return NextResponse.json(
        { error: 'Error de configuración del servidor. Por favor, contacta al administrador.' },
        { status: 500 }
      );
    }
    
    // Error genérico para el cliente
    return NextResponse.json(
      { error: 'Error interno del servidor al procesar la solicitud. Por favor, intenta más tarde.' },
      { status: 500 }
    );
  }
}

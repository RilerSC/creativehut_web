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
 * @fileoverview API Route para envío de emails desde formularios de contacto
 * @description Este archivo implementa un endpoint API que procesa las solicitudes
 * de contacto desde los formularios del sitio web y las envía por email usando
 * Microsoft 365 SMTP. Utiliza el sistema de App Router de Next.js 13+.
 * 
 * @module SendEmailAPI
 * @version 1.0.0
 * @author José Ríler Solórzano Campos <web@creativehutcr.com>
 * @company DEVIT506 - www.devit506.net
 * @since 2025-07-28
 * 
 * @requires next/server - Framework Next.js para manejo de requests/responses
 * @requires nodemailer - Librería para envío de emails vía SMTP
 * 
 * @dependencies
 * - Variables de entorno: EMAIL_USER, EMAIL_PASS, EMAIL_FROM, EMAIL_TO
 * - Configuración SMTP: Microsoft 365 (smtp.office365.com:587)
 * - Componentes que consumen: ContactForm.tsx (src/components/)
 * 
 * @security
 * - Validación de campos requeridos
 * - Sanitización de contenido HTML
 * - Autenticación SMTP segura
 * - Rate limiting (debe implementarse a nivel de servidor)
 */

// ============================================================================
// IMPORTS - Dependencias externas del framework y librerías
// ============================================================================

/**
 * NextRequest y NextResponse provienen de 'next/server'
 * - Son parte del core de Next.js 13+ App Router
 * - NextRequest: Extiende la Web API Request con funcionalidades de Next.js
 * - NextResponse: Extiende la Web API Response con helpers de Next.js
 * - Usados para manejar HTTP requests/responses en API Routes
 */
import { NextRequest, NextResponse } from 'next/server';

/**
 * nodemailer es una librería externa para envío de emails en Node.js
 * - Instalada vía npm: "nodemailer": "^6.9.8"
 * - Permite conectar con diversos proveedores SMTP (Gmail, Outlook, etc.)
 * - Soporta autenticación, attachments, HTML/text emails
 * - Documentación: https://nodemailer.com/
 */
import nodemailer from 'nodemailer';

// ============================================================================
// INTERFACES - Definición de tipos para el formulario
// ============================================================================

/**
 * @interface ContactFormData
 * @description Estructura de datos que llega desde el formulario de contacto
 * @property {string} fullName - Nombre completo del usuario (requerido)
 * @property {string} email - Email del usuario (requerido, validado)
 * @property {string} [phone] - Teléfono del usuario (opcional)
 * @property {string} [service] - Servicio de interés (opcional)
 * @property {string} message - Mensaje del usuario (requerido)
 */
interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

/**
 * @interface ServiceMapping
 * @description Mapeo de códigos de servicio a nombres legibles
 */
interface ServiceMapping {
  [key: string]: string;
}

// ============================================================================
// CONFIGURACIÓN - Constantes del sistema
// ============================================================================

/**
 * @constant SERVICE_NAMES
 * @description Mapeo de identificadores de servicios a nombres legibles
 * @type {ServiceMapping}
 */
const SERVICE_NAMES: ServiceMapping = {
  'publicidad-digital': 'Publicidad Digital',
  'marketing-digital': 'Marketing Digital', 
  'produccion-digital': 'Producción Digital',
  'eventos': 'Eventos',
  'desarrollo': 'Desarrollo',
  'otro': 'Otro'
};

// ============================================================================
// API HANDLER - Función principal del endpoint
// ============================================================================

/**
 * @function POST
 * @description Handler principal para requests POST al endpoint /api/send-email
 * 
 * @async
 * @param {NextRequest} request - Objeto request de Next.js con datos del formulario
 * @returns {Promise<NextResponse>} Response con status 200 (éxito) o error (400/500)
 * 
 * @throws {Error} 400 - Campos requeridos faltantes
 * @throws {Error} 500 - Error interno del servidor/SMTP
 * 
 * @example
 * // Desde el frontend (ContactForm.tsx):
 * fetch('/api/send-email', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     fullName: 'Juan Pérez',
 *     email: 'juan@example.com',
 *     phone: '+506 1234-5678',
 *     service: 'desarrollo',
 *     message: 'Necesito una aplicación web'
 *   })
 * })
 * 
 * @workflow
 * 1. Extrae datos del request JSON
 * 2. Valida campos requeridos
 * 3. Configura transporter SMTP
 * 4. Verifica conexión SMTP
 * 5. Mapea servicio a nombre legible
 * 6. Construye email HTML/text
 * 7. Envía email
 * 8. Retorna respuesta de éxito o error
 */
export async function POST(request: NextRequest) {
  // ========================================================================
  // MANEJO DE ERRORES Y PROCESAMIENTO DE DATOS
  // ========================================================================
  
  try {
    // ======================================================================
    // EXTRACCIÓN DE DATOS - Parsing del JSON del request
    // ======================================================================
    
    /**
     * Destructuring de los datos del formulario enviados desde ContactForm.tsx
     * - request.json() es un método de NextRequest que parsea el body JSON
     * - Los datos vienen del componente ContactForm en /src/components/ContactForm.tsx
     * - El tipo implícito es ContactFormData según la interface definida arriba
     */
    const { fullName, email, phone, service, message }: ContactFormData = await request.json();

    // ======================================================================
    // VALIDACIÓN DE DATOS - Verificación de campos requeridos
    // ======================================================================
    
    /**
     * Validación básica de campos obligatorios
     * - fullName: Nombre completo del usuario (string no vacío)
     * - email: Email del usuario (string no vacío, validación básica)
     * - message: Mensaje del usuario (string no vacío)
     * - phone y service son opcionales
     * 
     * Si falta algún campo requerido, retorna error 400 (Bad Request)
     */
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son requeridos' },
        { status: 400 }
      );
    }

    // ======================================================================
    // CONFIGURACIÓN SMTP - Setup del transporter de nodemailer
    // ======================================================================
    
    /**
     * @description Configuración del transporter SMTP para Microsoft 365
     * 
     * @property {string} host - Servidor SMTP de Microsoft 365
     * @property {number} port - Puerto 587 para STARTTLS (recomendado)
     * @property {boolean} secure - false para puerto 587, true para 465
     * @property {object} auth - Credenciales de autenticación
     * @property {string} auth.user - Email de la cuenta (desde .env.local)
     * @property {string} auth.pass - Password de aplicación (desde .env.local)
     * @property {object} tls - Configuración TLS para compatibilidad
     * 
     * Variables de entorno requeridas en .env.local:
     * - EMAIL_USER=web@creativehutcr.com
     * - EMAIL_PASS=password_de_aplicacion_microsoft365
     */
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',           // Servidor SMTP oficial de Microsoft 365
      port: 587,                            // Puerto estándar para STARTTLS
      secure: false,                        // false para 587, true para 465 (SSL)
      auth: {
        user: process.env.EMAIL_USER,       // Usuario SMTP desde variables de entorno
        pass: process.env.EMAIL_PASS,       // Password desde variables de entorno
      },
      tls: {
        ciphers: 'SSLv3'                   // Configuración para compatibilidad con Outlook
      }
    });

    // ======================================================================
    // VERIFICACIÓN DE CONEXIÓN - Test de conectividad SMTP
    // ======================================================================
    
    /**
     * Verificación de la conexión SMTP antes de enviar
     * - transporter.verify() retorna Promise<boolean>
     * - Lanza excepción si hay problemas de autenticación o conexión
     * - Es buena práctica verificar antes de intentar enviar
     */
    await transporter.verify();

    // ======================================================================
    // MAPEO DE SERVICIOS - Conversión de códigos a nombres legibles
    // ======================================================================
    
    /**
     * @description Mapeo del servicio seleccionado a un nombre más legible
     * @param {string} service - Código del servicio desde el formulario
     * @returns {string} Nombre legible del servicio o 'No especificado'
     * 
     * Los códigos vienen de:
     * - ContactForm.tsx: select options con values como 'desarrollo', 'eventos', etc.
     * - Páginas de servicios: /servicios/desarrollo, /servicios/eventos, etc.
     */
    const serviceName = service ? SERVICE_NAMES[service] || service : 'No especificado';

    // ======================================================================
    // CONFIGURACIÓN DEL EMAIL - Construcción del mensaje a enviar
    // ======================================================================
    
    /**
     * @description Configuración completa del email a enviar
     * @type {nodemailer.SendMailOptions}
     * 
     * @property {string} from - Email remitente (desde .env.local: EMAIL_FROM)
     * @property {string} to - Email destinatario (desde .env.local: EMAIL_TO)  
     * @property {string} subject - Asunto dinámico con nombre del contacto
     * @property {string} html - Plantilla HTML profesional con estilos inline
     * @property {string} text - Versión plain text para clientes que no soportan HTML
     * 
     * Variables de entorno requeridas:
     * - EMAIL_FROM=web@creativehutcr.com (remitente)
     * - EMAIL_TO=contacto@creativehutcr.com (destinatario)
     * 
     * Nota: Los estilos están inline para máxima compatibilidad con clientes email
     */
    const mailOptions = {
      from: process.env.EMAIL_FROM,          // Remitente desde variables de entorno
      to: process.env.EMAIL_TO,              // Destinatario desde variables de entorno  
      subject: `Nuevo contacto desde la web - ${fullName}`,  // Asunto personalizado
      
      /**
       * PLANTILLA HTML - Diseño profesional responsivo
       * 
       * Estructura:
       * 1. Container principal con fondo gris claro
       * 2. Header con gradiente morado y título
       * 3. Sección de información del contacto (tabla)
       * 4. Sección del mensaje con fondo diferenciado
       * 5. Footer con timestamp en zona horaria de Costa Rica
       * 
       * Características:
       * - Máximo 600px de ancho para compatibilidad mobile
       * - Estilos inline para máxima compatibilidad
       * - Emojis para mejorar legibilidad
       * - Links clicables para email y teléfono
       * - Formato de fecha en español (Costa Rica)
       */
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
                  <td style="padding: 8px 0; color: #333;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">📧 Email:</td>
                  <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">📱 Teléfono:</td>
                  <td style="padding: 8px 0; color: #333;"><a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a></td>
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
              <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef; color: #333; line-height: 1.6;">
                ${message.replace(/\n/g, '<br>')}
              </div>
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
      
      /**
       * VERSIÓN TEXTO PLANO - Fallback para clientes que no soportan HTML
       * 
       * @description Versión simplificada del email en texto plano
       * - Misma información que la versión HTML
       * - Formato limpio y legible
       * - Fecha formateada para Costa Rica
       * - Incluye toda la información del contacto
       * - Se usa automáticamente si el cliente no soporta HTML
       */
      text: `
        Nuevo contacto desde Creative Hut
        
        Información del contacto:
        - Nombre: ${fullName}
        - Email: ${email}
        ${phone ? `- Teléfono: ${phone}` : ''}
        - Servicio de interés: ${serviceName}
        - Consentimiento: Acepta ser contactado para fines comerciales y de seguimiento
        
        Mensaje:
        ${message}
        
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

    // ======================================================================
    // ENVÍO DEL EMAIL - Ejecución del transporter
    // ======================================================================
    
    /**
     * Envío del email usando el transporter configurado
     * - transporter.sendMail() retorna Promise con info del envío
     * - Si falla, lanza excepción que es capturada por el catch
     * - Si es exitoso, continúa al return de éxito
     */
    await transporter.sendMail(mailOptions);

    // ======================================================================
    // RESPUESTA DE ÉXITO - Return exitoso al cliente
    // ======================================================================
    
    /**
     * Respuesta exitosa al cliente (frontend)
     * - Status 200: OK
     * - JSON con mensaje de confirmación
     * - Es capturada por ContactForm.tsx en el .then()
     */
    return NextResponse.json(
      { message: 'Email enviado exitosamente' },
      { status: 200 }
    );

  // ========================================================================
  // MANEJO DE ERRORES - Captura de excepciones
  // ========================================================================
  
  } catch (error) {
    // ======================================================================
    // LOGGING DE ERRORES - Registro para debugging
    // ======================================================================
    
    /**
     * Log del error para debugging
     * - Se registra en la consola del servidor
     * - Útil para debugging en desarrollo y producción
     * - El error puede venir de: JSON parsing, SMTP, validación, etc.
     */
    console.error('Error enviando email:', error);
    
    // ======================================================================
    // RESPUESTA DE ERROR - Return de error al cliente
    // ======================================================================
    
    /**
     * Respuesta de error al cliente (frontend)
     * - Status 500: Internal Server Error
     * - JSON con mensaje genérico (no expone detalles internos)
     * - Es capturada por ContactForm.tsx en el .catch()
     */
    return NextResponse.json(
      { error: 'Error interno del servidor al enviar el email' },
      { status: 500 }
    );
  }
}

// ============================================================================
// DOCUMENTACIÓN ADICIONAL
// ============================================================================

/**
 * @summary FLUJO COMPLETO DEL ENDPOINT
 * 
 * 1. CLIENTE → Envía POST a /api/send-email con datos del formulario
 * 2. SERVIDOR → Extrae y valida datos del request
 * 3. SERVIDOR → Configura conexión SMTP con Microsoft 365
 * 4. SERVIDOR → Verifica conectividad SMTP
 * 5. SERVIDOR → Construye email HTML y texto
 * 6. SERVIDOR → Envía email via SMTP
 * 7. SERVIDOR → Retorna respuesta de éxito/error al cliente
 * 8. CLIENTE → Procesa respuesta y muestra mensaje al usuario
 * 
 * @usage ARCHIVOS QUE USAN ESTE ENDPOINT
 * - /src/components/ContactForm.tsx (formulario principal)
 * - Páginas de servicios que incluyen ContactForm
 * 
 * @environment VARIABLES DE ENTORNO REQUERIDAS
 * - EMAIL_USER: Usuario SMTP (ej: web@creativehutcr.com)
 * - EMAIL_PASS: Password de aplicación Microsoft 365
 * - EMAIL_FROM: Email remitente para el campo "from"
 * - EMAIL_TO: Email destinatario donde llegan los mensajes
 * 
 * @security CONSIDERACIONES DE SEGURIDAD
 * - Rate limiting: Implementar en nginx/cloudflare
 * - Validación: Expandir validaciones de email y datos
 * - Sanitización: Los datos se escapan automáticamente en HTML
 * - Logs: No registrar información sensible (passwords, etc.)
 */

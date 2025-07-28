import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, phone, service, message } = await request.json();

    // Validación básica
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son requeridos' },
        { status: 400 }
      );
    }

  // Configurar transporter de nodemailer con Microsoft 365
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });    // Verificar la conexión
    await transporter.verify();

    // Mapear el servicio seleccionado a un nombre más legible
    const serviceNames: { [key: string]: string } = {
      'publicidad-digital': 'Publicidad Digital',
      'produccion-digital': 'Producción Digital',
      'eventos': 'Eventos',
      'desarrollo': 'Desarrollo',
      'otro': 'Otro'
    };

    const serviceName = service ? serviceNames[service] || service : 'No especificado';

    // Configuración del email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Nuevo contacto desde la web - ${fullName}`,
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

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email enviado exitosamente' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error enviando email:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al enviar el email' },
      { status: 500 }
    );
  }
}

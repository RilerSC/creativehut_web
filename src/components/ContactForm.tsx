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
 * @fileoverview Componente de formulario de contacto profesional y reutilizable
 * @description Implementa un formulario completo de contacto con validación,
 * integración con API de email, manejo de estados y UX optimizada.
 * 
 * @module ContactForm
 * @version 1.0.0
 * @author José Ríler Solórzano Campos <web@creativehutcr.com>
 * @company DEVIT506 - www.devit506.net
 * @since 2025-07-28
 * 
 * @requires react - Hooks useState, useRef para manejo de estado
 * @requires /api/send-email - Endpoint personalizado para envío de emails
 * 
 * @usage
 * import ContactForm from '@/components/ContactForm';
 * <ContactForm />
 * 
 * @dependencies
 * - API Route: /src/app/api/send-email/route.ts
 * - Usado en: Páginas de servicios, página principal
 * - Estilos: Tailwind CSS v4 (clases utility)
 * 
 * @features
 * - Validación en tiempo real
 * - Mensajes de éxito/error
 * - Loading states
 * - Botón WhatsApp integrado
 * - Formulario responsivo
 * - Consentimiento de datos
 */

// ============================================================================
// DIRECTIVA CLIENT - Indica que es un Client Component
// ============================================================================

/**
 * 'use client' - Directiva de Next.js 13+ App Router
 * - Marca este archivo como Client Component
 * - Permite uso de hooks de React (useState, useRef, useEffect)
 * - Se ejecuta en el navegador, no en el servidor
 * - Necesario para interactividad y manejo de estado
 */
'use client';

// ============================================================================
// IMPORTS - Dependencias de React y tipos
// ============================================================================

/**
 * Hooks de React importados desde 'react'
 * - useState: Para manejo de estado del formulario y UI
 * - useRef: Para referencias directas a elementos DOM
 */
import { useState, useRef } from 'react';
import Image from 'next/image';

// ============================================================================
// INTERFACES - Definición de tipos TypeScript
// ============================================================================

/**
 * @interface FormData
 * @description Estructura de datos del formulario de contacto
 * @property {string} fullName - Nombre completo del usuario (requerido)
 * @property {string} email - Email del usuario (requerido, con validación)
 * @property {string} phone - Teléfono del usuario (opcional)
 * @property {string} service - Servicio de interés seleccionado (opcional)
 * @property {string} message - Mensaje del usuario (requerido)
 * @property {boolean} consent - Consentimiento para contacto comercial (requerido)
 */
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  consent: boolean;
}

export default function ContactForm() {
  // Estado para controlar la visibilidad del formulario de contacto
  const [showContactForm, setShowContactForm] = useState(false);
  
  // Estado para el formulario
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    consent: false
  });

  // Estado para el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Referencias para la sección Footer "Conversemos"
  const footerTitleRef = useRef<HTMLHeadingElement>(null);
  const footerLineRef = useRef<HTMLDivElement>(null);
  const footerContentRef = useRef<HTMLDivElement>(null);
  const footerButtonRef = useRef<HTMLButtonElement>(null);

  // Manejar cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      setSubmitMessage('Debes aceptar ser contactado para enviar el formulario.');
      setSubmitSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('¡Mensaje enviado exitosamente! Te contactaremos pronto. 🎉');
        setSubmitSuccess(true);
        // Limpiar formulario
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          consent: false
        });
        // Cerrar formulario después de 3 segundos
        setTimeout(() => {
          setShowContactForm(false);
          setSubmitMessage('');
        }, 3000);
      } else {
        const errorData = await response.json();
        setSubmitMessage(errorData.error || 'Error al enviar el mensaje. Inténtalo de nuevo.');
        setSubmitSuccess(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Error de conexión. Verifica tu internet e inténtalo de nuevo.');
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer 
      id="conversemos" 
      className="py-20 bg-gradient-to-b from-gray-900 to-black border-t border-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            ref={footerTitleRef}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Conversemos
          </h2>
          <div 
            ref={footerLineRef}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"
          ></div>
        </div>
        
        <div ref={footerContentRef} className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            ¿Tienes un proyecto en mente? Estamos aquí para ayudarte a convertir tus ideas en realidad digital.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Teléfono */}
            <div className="text-center">
              <a 
                href="tel:+50672811381"
                className="block w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
                title="Llamar al +506 7281 1381"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
              </a>
              <h3 className="text-white font-semibold mb-2">Teléfono</h3>
              <a 
                href="tel:+50672811381"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                title="Llamar al +506 7281 1381"
              >
                +506 7281 1381
              </a>
            </div>

            {/* Email */}
            <div className="text-center">
              <a 
                href="mailto:hola@creativehutcr.com"
                className="block w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-4 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
                title="Enviar email a hola@creativehutcr.com"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </a>
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <a 
                href="mailto:hola@creativehutcr.com"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 cursor-pointer"
                title="Enviar email a hola@creativehutcr.com"
              >
                hola@creativehutcr.com
              </a>
            </div>

            {/* Redes Sociales */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-3.22l-1.14 1.14a1 1 0 01-1.42 0L7.22 15H5a2 2 0 01-2-2V5zm5.99 8.99l1.14-1.14A1 1 0 0110.78 12H15V7H5v5h4.22a1 1 0 01.77.35z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Síguenos</h3>
              <div className="flex justify-center space-x-6">
                {/* Facebook */}
                <a 
                  href="https://www.facebook.com/creativehutcr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative p-4 bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 rounded-xl hover:border-blue-400/60 transform transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 border border-blue-400/0 group-hover:border-blue-400/30 rounded-xl transition-all duration-300"></div>
                </a>
                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/creativehutcr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative p-4 bg-gray-900/50 backdrop-blur-sm border border-pink-500/30 rounded-xl hover:border-purple-400/60 transform transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6 text-pink-400 group-hover:text-purple-300 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.989.016 6.756.072 5.525.127 4.73.334 4.033.63c-.735.31-1.36.724-1.985 1.348C1.423 2.603 1.008 3.228.697 3.963.401 4.66.194 5.455.139 6.686.083 7.92.067 8.327.067 11.948c0 3.621.016 4.028.072 5.261.055 1.23.262 2.025.558 2.722.31.735.724 1.36 1.348 1.985.625.624 1.25 1.038 1.985 1.348.697.296 1.492.503 2.722.558 1.233.056 1.64.072 5.261.072 3.621 0 4.028-.016 5.261-.072 1.23-.055 2.025-.262 2.722-.558.735-.31 1.36-.724 1.985-1.348.624-.625 1.038-1.25 1.348-1.985.296-.697.503-1.492.558-2.722.056-1.233.072-1.64.072-5.261 0-3.621-.016-4.028-.072-5.261-.055-1.23-.262-2.025-.558-2.722-.31-.735-.724-1.36-1.348-1.985C19.396 1.423 18.771 1.008 18.036.697c-.697-.296-1.492-.503-2.722-.558C14.081.016 13.674 0 12.017 0zM12.017 2.162c3.557 0 3.984.015 5.39.072 1.3.059 2.006.273 2.477.456.623.242 1.067.532 1.534.998.466.467.756.911.998 1.534.183.471.397 1.177.456 2.477.057 1.406.072 1.833.072 5.39 0 3.557-.015 3.984-.072 5.39-.059 1.3-.273 2.006-.456 2.477-.242.623-.532 1.067-.998 1.534-.467.466-.911.756-1.534.998-.471.183-1.177.397-2.477.456-1.406.057-1.833.072-5.39.072-3.557 0-3.984-.015-5.39-.072-1.3-.059-2.006-.273-2.477-.456-.623-.242-1.067-.532-1.534-.998-.466-.467-.756-.911-.998-1.534-.183-.471-.397-1.177-.456-2.477-.057-1.406-.072-1.833-.072-5.39 0-3.557.015-3.984.072-5.39.059-1.3.273-2.006.456-2.477.242-.623.532-1.067.998-1.534.467-.466.911-.756 1.534-.998.471-.183 1.177-.397 2.477-.456 1.406-.057 1.833-.072 5.39-.072zm0 3.679c-3.754 0-6.798 3.044-6.798 6.798s3.044 6.798 6.798 6.798 6.798-3.044 6.798-6.798-3.044-6.798-6.798-6.798zm0 11.212c-2.437 0-4.414-1.977-4.414-4.414s1.977-4.414 4.414-4.414 4.414 1.977 4.414 4.414-1.977 4.414-4.414 4.414zm8.651-11.484c-.876 0-1.586-.71-1.586-1.586s.71-1.586 1.586-1.586 1.586.71 1.586 1.586-.71 1.586-1.586 1.586z"/>
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 border border-purple-400/0 group-hover:border-purple-400/30 rounded-xl transition-all duration-300"></div>
                </a>
              </div>
            </div>
          </div>

          {/* Botones CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              ref={footerButtonRef}
              onClick={() => setShowContactForm(!showContactForm)}
              className="group relative px-12 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold text-lg rounded-full overflow-hidden transform transition-all duration-200 hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Image 
                  src="/brand/logos/isotipo-fullcolor.svg" 
                  alt="Creative Hut - Agencia Digital Costa Rica"
                  width={26}
                  height={26}
                  className="mr-2 opacity-90 group-hover:opacity-100 transition-opacity filter brightness-0 invert"
                />
                Hablemos
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>

            <a 
              href="https://wa.me/50672811381?text=Hola,%20estoy%20interesado%20en%20sus%20servicios%20de%20Creative%20Hut"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-12 py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white font-semibold text-lg rounded-full overflow-hidden transform transition-all duration-200 hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                </svg>
                WhatsApp
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </a>
          </div>
        </div>

        {/* Formulario de contacto - Solo visible cuando showContactForm es true */}
        {showContactForm && (
          <div className="mt-12 max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              ¡Cuéntanos sobre tu proyecto! 💡
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mensaje de estado */}
              {submitMessage && (
                <div className={`p-4 rounded-lg border ${
                  submitSuccess 
                    ? 'bg-green-900/50 border-green-500/50 text-green-200' 
                    : 'bg-red-900/50 border-red-500/50 text-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}

              {/* Nombre completo */}
              <div className="form-group">
                <label htmlFor="fullName" className="form-label block text-sm font-medium text-gray-300 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="form-control w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Ej: Juan Pérez González"
                />
              </div>

              {/* Correo electrónico */}
              <div className="form-group">
                <label htmlFor="email" className="form-label block text-sm font-medium text-gray-300 mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="form-control w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Ej: mi_correo@mi_dominio.com"
                />
              </div>

              {/* Teléfono */}
              <div className="form-group">
                <label htmlFor="phone" className="form-label block text-sm font-medium text-gray-300 mb-2">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="form-control w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Ej: +506 0000 0000"
                />
              </div>

              {/* Servicio de interés */}
              <div className="form-group">
                <label htmlFor="service" className="form-label block text-sm font-medium text-gray-300 mb-2">
                  Servicio de interés
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="form-control w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="publicidad-digital">Publicidad Digital</option>
                  <option value="produccion-digital">Producción Digital</option>
                  <option value="eventos">Eventos</option>
                  <option value="desarrollo">Desarrollo</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {/* Mensaje */}
              <div className="form-group">
                <label htmlFor="message" className="form-label block text-sm font-medium text-gray-300 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  disabled={isSubmitting}
                  className="form-control w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Cuéntanos sobre tu proyecto, ideas, objetivos, presupuesto aproximado, tiempos, etc."
                />
              </div>

              {/* Checkbox de consentimiento */}
              <div className="form-group">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="form-control mt-1 w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label htmlFor="consent" className="form-label text-sm text-gray-300">
                    Acepto ser contactado para fines comerciales y de seguimiento. *
                  </label>
                </div>
              </div>

              {/* Botón de envío */}
              <div className="form-group">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.consent}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-semibold text-lg rounded-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Image 
                        src="/brand/logos/isotipo-fullcolor.svg" 
                        alt="Creative Hut - Agencia Digital Costa Rica"
                        width={26}
                        height={26}
                        className="mr-2 opacity-90 group-hover:opacity-100 transition-opacity filter brightness-0 invert"
                      />
                      Enviar 🚀
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Creative Hut. Todos los derechos reservados. Diseñado con ❤️ para transformar ideas en realidad digital.
          </p>
        </div>
      </div>
    </footer>
  );
}

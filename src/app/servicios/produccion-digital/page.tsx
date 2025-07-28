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

'use client';

import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ContactForm from '@/components/ContactForm';

export default function ProduccionDigitalPage() {
  useEffect(() => {
    // FORZAR scroll al inicio INMEDIATAMENTE
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Backup: También forzar después de un pequeño delay por si las animaciones interfieren
    const forceTopScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };
    
    // Ejecutar múltiples veces para asegurar que se mantenga arriba
    setTimeout(forceTopScroll, 50);
    setTimeout(forceTopScroll, 100);
    setTimeout(forceTopScroll, 200);
    
    // Check if we need to scroll to a section after navigation
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 via-rose-600/15 to-purple-600/10"></div>
        
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/15 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Service Icon */}
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-pink-600 via-rose-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v2.586l2.707-2.707A1 1 0 0116 6.586V13.414a1 1 0 01-1.707.707L12 11.414V14a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
            </svg>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-hero-float">
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
              Producción
            </span>
            <br />
            <span className="text-white">Digital</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed animate-hero-float" style={{ animationDelay: '0.2s' }}>
            Creamos contenido audiovisual que conecta con tu audiencia. Desde videos corporativos hasta campañas publicitarias, transformamos tus ideas en producciones de alto impacto.
          </p>

          {/* Call to Action */}
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => document.getElementById('conversemos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Trabajemos juntos
            </button>
            <button
              onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-pink-500/50 text-pink-300 font-semibold rounded-2xl hover:bg-pink-500/10 transition-all duration-300"
            >
              Ver servicios
            </button>
          </div> */}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-pink-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-pink-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 right-20 w-40 h-40 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">¿Qué hacemos?</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Especializados en crear contenido audiovisual que transforma tu mensaje en experiencias memorables
            </p>
          </div>
          
          {/* Main featured service */}
          <div className="mb-16">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500/20 via-pink-500/15 to-purple-600/20 backdrop-blur-sm border border-rose-500/30 hover:border-rose-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-rose-500/25">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 md:p-12">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-rose-200 transition-colors duration-300">
                      Videos corporativos
                    </h3>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
                      Construimos piezas institucionales con propósito: presentación de tu empresa, testimoniales, procesos internos, videos de bienvenida o cultura organizacional. Cuidamos cada toma, audio y edición para reflejar profesionalismo.
                    </p>
                    <div className="flex items-center justify-center lg:justify-start text-rose-400 group-hover:text-rose-300 transition-colors">
                      <span className="text-sm font-semibold uppercase tracking-wide">Especialidad principal</span>
                      <div className="ml-3 w-8 h-0.5 bg-gradient-to-r from-rose-400 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid of services */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Service 2 - Reels y contenido para redes */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500/15 via-rose-500/10 to-purple-600/15 backdrop-blur-sm border border-pink-500/25 hover:border-pink-400/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 2v-8l-4 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-pink-200 transition-colors duration-300">
                  Reels y contenido para redes
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Producimos videos verticales ágiles, estéticos y con gancho para captar la atención en Instagram, TikTok, Facebook o YouTube Shorts. Usamos narrativa visual y edición dinámica que conecta.
                </p>
              </div>
            </div>

            {/* Service 3 - Transmisiones en vivo */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/15 via-pink-500/10 to-rose-600/15 backdrop-blur-sm border border-purple-500/25 hover:border-purple-400/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 2v-8l-4 2z"/>
                    <circle cx="9" cy="12" r="2"/>
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors duration-300">
                  Transmisiones en vivo
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Coordinamos transmisiones profesionales multicámara, con sonido en vivo, branding e interacción en tiempo real. Ideal para eventos corporativos.
                </p>
              </div>
            </div>
          </div>

          {/* Photography services section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Servicios de Fotografía</h3>
              <div className="h-0.5 w-24 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Fotografía Corporativa */}
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/15 via-cyan-500/10 to-teal-600/15 backdrop-blur-sm border border-blue-500/25 hover:border-blue-400/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 2l1.17 1.17L14 5l2.83-1.17L18 2l1 7h-8L9 2zm4 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM6 9v7c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9H6z"/>
                      <circle cx="9" cy="13" r="1.25"/>
                      <path d="M14 11.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
                    </svg>
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors duration-300">
                    Fotografía Corporativa
                  </h4>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Capturamos la esencia de tu equipo, tu espacio y tu cultura. Nuestras sesiones están diseñadas para proyectar confianza, profesionalismo y cercanía.
                  </p>
                </div>
              </div>

              {/* Fotografía de Eventos */}
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-cyan-600/15 backdrop-blur-sm border border-emerald-500/25 hover:border-emerald-400/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4v12H8.37l.63-2H19V6H5v10.37l2-2V8h12v8zM6 17l6-6 4 4 4-4v2l-4 4-4-4-2 2z"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                    </svg>
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-emerald-200 transition-colors duration-300">
                    Fotografía de Eventos
                  </h4>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Documentamos tus eventos con ojo estratégico y sensibilidad visual. Construimos memorias visuales que podés usar después para comunicar y reforzar tu marca.
                  </p>
                </div>
              </div>

              {/* Fotografía Gastronómica */}
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-red-600/15 backdrop-blur-sm border border-amber-500/25 hover:border-amber-400/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.1 13.34l2.83-2.83L12.93 12l2.83-2.83 1.41 1.41L14.34 13.34l2.83 2.83-1.41 1.41L12.93 14.75l-2.83 2.83-1.41-1.41L11.52 13.34 8.69 10.51l1.41-1.41 2.83 2.83z"/>
                      <path d="M9 2l1.17 1.17L14 5l2.83-1.17L18 2l1 7h-8L9 2zm4 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                      <path d="M2 17h20v2H2z"/>
                    </svg>
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-amber-200 transition-colors duration-300">
                    Fotografía Gastronómica
                  </h4>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Realizamos sesiones especializadas en productos gastronómicos. Cuidamos la iluminación, el estilismo y el encuadre para lograr imágenes irresistibles.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid of services */}
          

          {/* Bottom services row */}
          <div className="mb-16">
            {/* Service 5 - Guiones y narrativa - Full width */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600/15 via-pink-500/10 to-purple-500/15 backdrop-blur-sm border border-rose-600/25 hover:border-rose-500/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-600/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 md:p-12">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-rose-600 to-purple-500 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                        <path d="M14 2v6h6"/>
                        <path d="M16 13H8"/>
                        <path d="M16 17H8"/>
                        <path d="M10 9H8"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-rose-200 transition-colors duration-300">
                      Guiones y estructura narrativa
                    </h3>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                      Te ayudamos a definir la idea, el enfoque, los mensajes y la duración de cada video, para que el resultado sea claro y memorable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">¿Por qué con nosotros?</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-12"></div>
            
            <div className="bg-gradient-to-br from-pink-500/10 via-rose-500/10 to-purple-600/10 backdrop-blur-sm border border-pink-500/20 rounded-3xl p-8 md:p-12 mb-8">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
                Porque entendemos que el video no es solo una moda, es una <span className="text-pink-400 font-semibold">herramienta estratégica</span>. 
                Contamos con equipo técnico, dirección audiovisual y experiencia para transformar tu mensaje en una experiencia visual profesional y coherente con tu marca.
              </p>
              
              <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-2xl p-6">
                <p className="text-lg md:text-xl text-white font-medium">
                  Desde una historia de Instagram hasta un documental institucional, todo comienza con una buena producción.
                </p>
              </div>
            </div>
            
            {/* <Link href="#conversemos" className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white font-semibold text-lg rounded-full overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="relative z-10 flex items-center justify-center">
                Hablemos de tu proyecto
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </span>
            </Link> */}
          </div>
        </div>
      </section>

      {/* Contact Form Component */}
      <ContactForm />
    </div>
  );
}

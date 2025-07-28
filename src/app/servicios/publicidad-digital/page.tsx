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

import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ContactForm from '@/components/ContactForm';

export default function PublicidadDigitalPage() {
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
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/15 to-blue-600/10"></div>
        
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/15 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Service Icon */}
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-hero-float">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Publicidad
            </span>
            <br />
            <span className="text-white">Digital</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed animate-hero-float" style={{ animationDelay: '0.2s' }}>
            Transformamos ideas en contenido visual con propósito. Nuestra unidad de Publicidad Digital está enfocada en ayudarte a comunicar con claridad, coherencia y estilo.
          </p>

          {/* Call to Action */}
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => document.getElementById('conversemos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white font-semibold rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Trabajemos juntos
            </button>
            <button
              onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-violet-500/50 text-violet-300 font-semibold rounded-2xl hover:bg-violet-500/10 transition-all duration-300"
            >
              Ver servicios
            </button>
          </div> */}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-violet-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-violet-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Qué hacemos?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Creamos contenido estratégico que te diferencia, que refuerza tu presencia en redes sociales y que genera valor real para tu marca.
            </p>
          </div>

          {/* Main Service - Diseño Gráfico */}
          <div className="mb-16">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/20 via-purple-600/15 to-blue-600/20 backdrop-blur-sm border border-violet-500/30 hover:border-violet-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 md:p-12">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 group-hover:text-violet-200 transition-colors duration-300">
                      Diseño gráfico creativo
                    </h3>
                    <p className="text-gray-300 text-xl md:text-2xl leading-relaxed mb-6">
                      Creamos piezas visuales personalizadas para redes sociales, carruseles, presentaciones, catálogos, banners y mucho más. Cada diseño está pensado para conectar con tu audiencia, adaptado a tu identidad y tu tono de comunicación.
                    </p>
                    <div className="inline-flex items-center text-violet-300 font-semibold text-lg">
                      <span>Nuestra especialidad principal</span>
                      <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Service 1 - Branding Visual */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/15 via-purple-500/10 to-blue-500/15 backdrop-blur-sm border border-violet-600/25 hover:border-violet-500/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-violet-200 transition-colors duration-300">
                  Branding visual
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Te acompañamos en el desarrollo o renovación de tu identidad de marca. Desde logotipos y paletas de color, hasta líneas gráficas y guías visuales que le dan solidez y personalidad a tu presencia digital.
                </p>
              </div>
            </div>

            {/* Service 2 - Campañas para Redes */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600/15 via-violet-500/10 to-blue-500/15 backdrop-blur-sm border border-purple-600/25 hover:border-purple-500/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors duration-300">
                  Campañas para redes sociales
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Diseñamos campañas visuales temáticas con narrativa y consistencia gráfica, ya sea para fechas especiales, lanzamientos de productos o comunicación institucional.
                </p>
              </div>
            </div>
          </div>

          {/* Supporting Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Service 3 - Adaptaciones */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600/15 via-violet-500/10 to-purple-500/15 backdrop-blur-sm border border-blue-600/25 hover:border-blue-500/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors duration-300">
                  Adaptaciones de contenido
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  No todo diseño funciona igual en todos los canales. Por eso, ajustamos y optimizamos tus piezas para que se vean impecables en cualquier plataforma o dispositivo.
                </p>
              </div>
            </div>

            {/* Service 4 - Animaciones */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/15 via-blue-500/10 to-purple-500/15 backdrop-blur-sm border border-violet-600/25 hover:border-violet-500/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-violet-200 transition-colors duration-300">
                  Animaciones básicas
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Agregamos movimiento a tus mensajes con piezas animadas para historias, reels, headers, banners o promociones. Ideal para captar la atención en segundos.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="mb-16">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/20 via-purple-600/15 to-blue-600/20 backdrop-blur-sm border border-violet-500/30 hover:border-violet-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 md:p-12">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 group-hover:text-violet-200 transition-colors duration-300">
                    ¿Por qué con nosotros?
                  </h3>
                  <p className="text-gray-300 text-xl md:text-2xl leading-relaxed mb-8 max-w-4xl mx-auto">
                    Porque sabemos que en el mundo digital, todo comunica. Nuestro trabajo no es solo &ldquo;hacer artes&rdquo;, es entender tu marca, interpretar tu estilo y crear piezas que te representen con fuerza.
                  </p>
                  <p className="text-violet-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                    Trabajamos con intención, cuidamos los detalles y nos alineamos con tus objetivos desde el diseño más pequeño hasta la campaña más ambiciosa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactForm />
    </div>
  );
}

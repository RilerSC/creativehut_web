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

export default function EventosPage() {
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

  // Schema.org para el servicio de eventos corporativos
  const eventsSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Eventos Corporativos",
    "description": "Producción integral de eventos corporativos, institucionales y comerciales en Costa Rica. Conectamos, inspiramos y dejamos huella en cada evento.",
    "provider": {
      "@type": "Organization",
      "name": "Creative Hut",
      "url": "https://creativehutcr.com"
    },
    "areaServed": {
      "@type": "Country", 
      "name": "Costa Rica"
    },
    "serviceType": "Event Planning",
    "category": "Event Services",
    "offers": {
      "@type": "Offer",
      "description": "Organización y producción de eventos corporativos, lanzamientos de productos, conferencias y activaciones de marca",
      "seller": {
        "@type": "Organization",
        "name": "Creative Hut"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Eventos",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lanzamientos de Producto", 
            "description": "Eventos memorables que posicionan tu producto desde el primer día"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Conferencias y Seminarios",
            "description": "Eventos educativos y profesionales que inspiran y conectan"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Activaciones de Marca",
            "description": "Experiencias inmersivas que conectan emocionalmente con tu audiencia"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Celebraciones Corporativas",
            "description": "Eventos que fortalecen la cultura empresarial y celebran logros"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventsSchema),
        }}
      />
      <div className="min-h-screen bg-gray-900">
      <header>
        <Navigation />
      </header>
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/15 to-red-600/10"></div>
        
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/15 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Service Icon */}
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-hero-float">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Eventos
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed animate-hero-float" style={{ animationDelay: '0.2s' }}>
            Cada evento es una oportunidad para conectar, inspirar y dejar huella. Nos especializamos en la producción y ejecución integral de eventos corporativos, institucionales y comerciales.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-orange-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse"></div>
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
              Te acompañamos desde la planificación hasta la ejecución con soluciones técnicas de alta calidad, cuidando cada detalle para que tu mensaje llegue con fuerza, claridad y estilo.
            </p>
          </div>

          {/* Main Service - Producción Técnica */}
          <div className="mb-16">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-500/20 via-orange-500/15 to-red-600/20 backdrop-blur-sm border border-orange-500/30 hover:border-orange-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 md:p-12">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 6h-4l-2-2h-6L7 6H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H3V8h18v10z"/>
                        <circle cx="12" cy="13" r="3"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 group-hover:text-orange-200 transition-colors duration-300">
                      Producción técnica completa
                    </h3>
                    <p className="text-gray-300 text-xl md:text-2xl leading-relaxed mb-6">
                      Nos encargamos del montaje y operación de todos los componentes técnicos necesarios: sonido profesional, video, pantallas LED, iluminación, micrófonos, escenografía y más.
                    </p>
                    <div className="inline-flex items-center text-orange-300 font-semibold text-lg">
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
            {/* Service 1 - Coordinación Audiovisual */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-500/15 via-orange-500/10 to-red-500/15 backdrop-blur-sm border border-yellow-500/25 hover:border-yellow-400/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-yellow-200 transition-colors duration-300">
                  Coordinación audiovisual
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Diseñamos la estructura visual y sonora del evento: qué se ve, qué se escucha y cuándo. Coordinamos presentaciones, videos, transiciones y momentos clave con precisión y fluidez.
                </p>
              </div>
            </div>

            {/* Service 2 - Transmisión en Vivo */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500/15 via-red-500/10 to-yellow-500/15 backdrop-blur-sm border border-orange-500/25 hover:border-orange-400/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-orange-200 transition-colors duration-300">
                  Transmisión en vivo (streaming)
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Si tu evento también se vive en línea, lo hacemos posible con producción en tiempo real, realización multicámara, audio optimizado y opciones de interacción.
                </p>
              </div>
            </div>
          </div>

          {/* Supporting Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Service 3 - Soporte Logístico */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500/15 via-orange-500/10 to-yellow-500/15 backdrop-blur-sm border border-red-500/25 hover:border-red-400/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-red-200 transition-colors duration-300">
                  Soporte logístico y creativo
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Desde la agenda hasta el contenido gráfico proyectado, podemos ayudarte a organizar y comunicar tu evento de forma coherente, moderna y con identidad propia.
                </p>
              </div>
            </div>

            {/* Service 4 - Cobertura */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-500/15 via-red-500/10 to-orange-500/15 backdrop-blur-sm border border-yellow-500/25 hover:border-yellow-400/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 6h-4l-2-2h-6L7 6H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H3V8h18v10z"/>
                    <circle cx="12" cy="13" r="3"/>
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-yellow-200 transition-colors duration-300">
                  Cobertura fotográfica y video resumen
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Documentamos tu evento con fotos y videos editados profesionalmente para que puedas compartirlo, revivirlo o promocionarlo después.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="mb-16">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-500/20 via-orange-500/15 to-red-600/20 backdrop-blur-sm border border-orange-500/30 hover:border-orange-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 md:p-12">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 group-hover:text-orange-200 transition-colors duration-300">
                    ¿Por qué con nosotros?
                  </h3>
                  <p className="text-gray-300 text-xl md:text-2xl leading-relaxed mb-8 max-w-4xl mx-auto">
                    Porque entendemos que un evento no se improvisa. Requiere planeación, técnica, sensibilidad y compromiso. Trabajamos con equipos de alta calidad, personal experimentado y un enfoque centrado en vos.
                  </p>
                  <p className="text-orange-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                    Nos tomamos tu evento tan en serio como si fuera nuestro.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Contact Section */}
      <ContactForm />
      </div>
    </>
  );
}

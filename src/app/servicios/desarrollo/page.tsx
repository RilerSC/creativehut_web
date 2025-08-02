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
import Link from 'next/link';

export default function DesarrolloPage() {
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

  // Schema.org para el servicio de desarrollo web
  const webDevelopmentSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Desarrollo Web Profesional",
    "description": "Desarrollo web profesional en Costa Rica. Creamos sitios web, aplicaciones y plataformas digitales que conectan, convierten y escalan con tu negocio.",
    "provider": {
      "@type": "Organization",
      "name": "Creative Hut",
      "url": "https://creativehutcr.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Costa Rica"
    },
    "serviceType": "Web Development",
    "category": "Technology Services",
    "offers": {
      "@type": "Offer",
      "description": "Desarrollo de sitios web corporativos, tiendas online y portafolios digitales",
      "seller": {
        "@type": "Organization",
        "name": "Creative Hut"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Desarrollo Web",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sitios Corporativos",
            "description": "Plataformas profesionales que transmiten confianza y generan resultados medibles"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Tiendas Online",
            "description": "E-commerce completos con pasarelas de pago, gestión de inventario y herramientas de marketing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Portafolios Digitales", 
            "description": "Showcases únicos que destacan tu trabajo y atraen a los clientes ideales"
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
          __html: JSON.stringify(webDevelopmentSchema),
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
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-teal-600/15 to-emerald-600/10"></div>
        
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/15 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Service Icon */}
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl animate-hero-float">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-hero-float">
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Desarrollo Web
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed animate-hero-float" style={{ animationDelay: '0.2s' }}>
            En un mundo donde todo pasa por lo digital, contar con herramientas bien hechas ya no es un lujo, es una necesidad. Creamos plataformas que no solo funcionan, sino que conectan, convierten y escalan con tu negocio.
          </p>

          {/* Call to Action */}
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => document.getElementById('conversemos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 text-white font-semibold rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Trabajemos juntos
            </button>
            <button
              onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-cyan-500/50 text-cyan-300 font-semibold rounded-2xl hover:bg-cyan-500/10 transition-all duration-300"
            >
              Ver servicios
            </button>
          </div> */}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 right-20 w-40 h-40 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">¿Qué hacemos?</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Especializados en crear soluciones digitales que transforman tu negocio en experiencias tecnológicas de vanguardia
            </p>
          </div>
          
          {/* Main featured service */}
          <div className="mb-16">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 via-teal-500/15 to-emerald-600/20 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/25">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 md:p-12">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-cyan-200 transition-colors duration-300">
                      Desarrollo web profesional
                    </h3>
                    <p className="text-xl text-gray-300 mb-6 group-hover:text-gray-200 transition-colors duration-300">
                      Tu presencia digital merece más que una página bonita. Creamos sitios web que trabajan 24/7 para hacer crecer tu negocio, optimizados para convertir visitantes en clientes reales.
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold mb-3 text-white">Sitios corporativos</h4>
                    <p className="text-gray-400">Plataformas profesionales que transmiten confianza y generan resultados medibles para tu empresa.</p>
                  </div>

                  <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM6 9.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-1zm0 3a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold mb-3 text-white">Tiendas online</h4>
                    <p className="text-gray-400">E-commerce completos con pasarelas de pago, gestión de inventario y herramientas de marketing.</p>
                  </div>

                  <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold mb-3 text-white">Portafolios digitales</h4>
                    <p className="text-gray-400">Showcases únicos que destacan tu trabajo y atraen a los clientes ideales para tu negocio.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-12 bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <Link 
            href="/#servicios" 
            className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver a todos los servicios
          </Link>
        </div>
      </section>
      </main>

      <ContactForm />
      </div>
    </>
  );
}

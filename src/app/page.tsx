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

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import ContactForm from '@/components/ContactForm';
import { useAnimations } from '@/hooks/useAnimations';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function Home() {
  // Referencias para la sección ADN
  const adnTitleRef = useRef<HTMLHeadingElement>(null);
  const adnLineRef = useRef<HTMLDivElement>(null);
  const adnColumn1Ref = useRef<HTMLDivElement>(null);
  const adnColumn2Ref = useRef<HTMLDivElement>(null);
  const adnColumn3Ref = useRef<HTMLDivElement>(null);
  
  // Referencias para la segunda fila de ADN - Socios
  const socio1Ref = useRef<HTMLDivElement>(null);
  const socio2Ref = useRef<HTMLDivElement>(null);
  const socio3Ref = useRef<HTMLDivElement>(null);
  const socio4Ref = useRef<HTMLDivElement>(null);
  
  // Referencias para la sección "Lo que hacemos"
  const servicesTitleRef = useRef<HTMLHeadingElement>(null);
  const servicesLineRef = useRef<HTMLDivElement>(null);
  const servicesCard1Ref = useRef<HTMLDivElement>(null);
  const servicesCard2Ref = useRef<HTMLDivElement>(null);
  const servicesCard3Ref = useRef<HTMLDivElement>(null);
  const servicesCard4Ref = useRef<HTMLDivElement>(null);
  
  // Referencias para la sección "Ellos confían"
  const clientsTitleRef = useRef<HTMLHeadingElement>(null);
  const clientsLineRef = useRef<HTMLDivElement>(null);
  const clientsSwiperRef = useRef<HTMLDivElement>(null);
  
  const { animateIn, gsap } = useAnimations();

  useEffect(() => {
    // Configurar estado inicial invisible para todos los elementos animados INMEDIATAMENTE
    const setInitialState = () => {
      // Títulos y líneas
      if (adnTitleRef.current) gsap.set(adnTitleRef.current, { opacity: 0, y: 30 });
      if (adnLineRef.current) gsap.set(adnLineRef.current, { opacity: 0, y: 20 });
      if (servicesTitleRef.current) gsap.set(servicesTitleRef.current, { opacity: 0, y: 30 });
      if (servicesLineRef.current) gsap.set(servicesLineRef.current, { opacity: 0, y: 20 });
      if (clientsTitleRef.current) gsap.set(clientsTitleRef.current, { opacity: 0, y: 30 });
      if (clientsLineRef.current) gsap.set(clientsLineRef.current, { opacity: 0, y: 20 });
      
      // Cards ADN
      if (adnColumn1Ref.current) gsap.set(adnColumn1Ref.current, { opacity: 0, y: 30 });
      if (adnColumn2Ref.current) gsap.set(adnColumn2Ref.current, { opacity: 0, y: 30 });
      if (adnColumn3Ref.current) gsap.set(adnColumn3Ref.current, { opacity: 0, y: 30 });
      
      // Cards Socios
      if (socio1Ref.current) gsap.set(socio1Ref.current, { opacity: 0, y: 30 });
      if (socio2Ref.current) gsap.set(socio2Ref.current, { opacity: 0, y: 30 });
      if (socio3Ref.current) gsap.set(socio3Ref.current, { opacity: 0, y: 30 });
      if (socio4Ref.current) gsap.set(socio4Ref.current, { opacity: 0, y: 30 });
      
      // Cards Servicios
      if (servicesCard1Ref.current) gsap.set(servicesCard1Ref.current, { opacity: 0, y: 30 });
      if (servicesCard2Ref.current) gsap.set(servicesCard2Ref.current, { opacity: 0, y: 30 });
      if (servicesCard3Ref.current) gsap.set(servicesCard3Ref.current, { opacity: 0, y: 30 });
      if (servicesCard4Ref.current) gsap.set(servicesCard4Ref.current, { opacity: 0, y: 30 });
      
      // Swiper clientes
      if (clientsSwiperRef.current) gsap.set(clientsSwiperRef.current, { opacity: 0, y: 30 });
      
    };

    // Establecer estado inicial inmediatamente
    setInitialState();

    // Función reutilizable para animar líneas de título
    const animateTitleLine = (titleRef: React.RefObject<HTMLElement | null>, lineRef: React.RefObject<HTMLElement | null>, delay: number = 0.4) => {
      if (titleRef.current && lineRef.current) {
        const titleWidth = titleRef.current.offsetWidth;
        lineRef.current.style.width = `${titleWidth * 0.8}px`; // 80% del ancho del título
        
        // Animar título con fade suave (SIN gsap.set porque ya está configurado)
        gsap.to(titleRef.current, { 
          delay: delay - 0.15, // 0.2 / 1.35 = 0.15 (35% más rápido)
          duration: 0.89, // 1.2 / 1.35 = 0.89 (35% más rápido)
          y: 0,
          opacity: 1,
          ease: "power2.out"
        });
        
        // Animar línea con fade suave (SIN gsap.set porque ya está configurado)
        gsap.to(lineRef.current, { 
          delay, 
          duration: 0.74, // 1.0 / 1.35 = 0.74 (35% más rápido)
          y: 0,
          opacity: 1,
          ease: "power2.out"
        });
      }
    };

    // Observadores de intersección
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px 0px -100px 0px',
    };

    // Observer para ADN section
    const adnObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animar título de ADN usando función reutilizable
          animateTitleLine(adnTitleRef, adnLineRef);
          
          // Animar contenido de ADN (SIN gsap.set porque ya está configurado)
          setTimeout(() => {
            if (adnColumn1Ref.current) {
              gsap.to(adnColumn1Ref.current, { 
                delay: 0.44, // 0.6 / 1.35 = 0.44 (35% más rápido)
                duration: 0.89, // 1.2 / 1.35 = 0.89 (35% más rápido)
                y: 0,
                opacity: 1,
                ease: "power2.out"
              });
            }
            if (adnColumn2Ref.current) {
              gsap.to(adnColumn2Ref.current, { 
                delay: 0.59, // 0.8 / 1.35 = 0.59 (35% más rápido)
                duration: 0.89, // 1.2 / 1.35 = 0.89 (35% más rápido)
                y: 0,
                opacity: 1,
                ease: "power2.out"
              });
            }
            if (adnColumn3Ref.current) {
              gsap.to(adnColumn3Ref.current, { 
                delay: 0.74, // 1.0 / 1.35 = 0.74 (35% más rápido)
                duration: 0.89, // 1.2 / 1.35 = 0.89 (35% más rápido)
                y: 0,
                opacity: 1,
                ease: "power2.out"
              });
            }
          }, 444); // 600 / 1.35 = 444 (35% más rápido)
          
          // Animar socios con un delay adicional para crear secuencia
          setTimeout(() => {
            if (socio1Ref.current) {
              gsap.to(socio1Ref.current, { 
                delay: 0.89, // 1.2 / 1.35 = 0.89 (35% más rápido)
                duration: 0.89,
                y: 0,
                opacity: 1,
                ease: "power2.out"
              });
            }
            if (socio2Ref.current) {
              gsap.to(socio2Ref.current, { 
                delay: 1.04, // 1.4 / 1.35 = 1.04 (35% más rápido)
                duration: 0.89,
                y: 0,
                opacity: 1,
                ease: "power2.out"
              });
            }
            if (socio3Ref.current) {
              gsap.to(socio3Ref.current, { 
                delay: 1.19, // 1.6 / 1.35 = 1.19 (35% más rápido)
                duration: 0.89,
                y: 0,
                opacity: 1,
                ease: "power2.out"
              });
            }
            if (socio4Ref.current) {
              gsap.to(socio4Ref.current, { 
                delay: 1.33, // 1.8 / 1.35 = 1.33 (35% más rápido)
                duration: 0.89,
                y: 0,
                opacity: 1,
                ease: "power2.out"
              });
            }
          }, 666); // 900 / 1.35 = 666 (35% más rápido)
        }
      },
      observerOptions
    );

    // Observer para Services section
    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animar título de servicios usando función reutilizable
          animateTitleLine(servicesTitleRef, servicesLineRef, 0.2);
          
          // Animar cards de servicios (SIN gsap.set porque ya está configurado)
          setTimeout(() => {
            if (servicesCard1Ref.current) {
              gsap.to(servicesCard1Ref.current, { 
                delay: 0.30, // 0.4 / 1.35 = 0.30 (35% más rápido)
                duration: 0.89, // 1.2 / 1.35 = 0.89 (35% más rápido)
                y: 0,
                opacity: 1,
                ease: "power2.out"
              });
            }
            if (servicesCard2Ref.current) {
              gsap.to(servicesCard2Ref.current, { 
                delay: 0.44, // 0.6 / 1.35 = 0.44 (35% más rápido)
                duration: 0.89, // 1.2 / 1.35 = 0.89 (35% más rápido)
                y: 0,
                opacity: 1,
                ease: "power2.out"
              });
            }
            if (servicesCard3Ref.current) {
              gsap.to(servicesCard3Ref.current, { 
                delay: 0.59, // 0.8 / 1.35 = 0.59 (35% más rápido)
                duration: 0.89, // 1.2 / 1.35 = 0.89 (35% más rápido)
                y: 0,
                opacity: 1,
                ease: "power2.out"
              });
            }
            if (servicesCard4Ref.current) {
              gsap.to(servicesCard4Ref.current, { 
                delay: 0.74, // 1.0 / 1.35 = 0.74 (35% más rápido)
                duration: 0.89, // 1.2 / 1.35 = 0.89 (35% más rápido)
                y: 0,
                opacity: 1,
                ease: "power2.out"
              });
            }
          }, 444); // 600 / 1.35 = 444 (35% más rápido)
        }
      },
      observerOptions
    );

    // Observer para clientes
    const clientsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animar línea de clientes usando función reutilizable
          animateTitleLine(clientsTitleRef, clientsLineRef, 0.4);
          
          // Animar swiper de clientes con fade suave (SIN gsap.set porque ya está configurado)
          if (clientsSwiperRef.current) {
            gsap.to(clientsSwiperRef.current, { 
              delay: 0.44, // 0.6 / 1.35 = 0.44 (35% más rápido)
              duration: 0.89, // 1.2 / 1.35 = 0.89 (35% más rápido)
              y: 0,
              opacity: 1,
              ease: "power2.out"
            });
          }
        }
      },
      observerOptions
    );

    // Observer para footer
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Footer animations removed since using ContactForm component now
        }
      },
      observerOptions
    );

    // Observar las secciones
    const adnSection = document.getElementById('nuestro-adn');
    if (adnSection) {
      adnObserver.observe(adnSection);
    }

    const servicesSection = document.getElementById('lo-que-hacemos');
    if (servicesSection) {
      servicesObserver.observe(servicesSection);
    }

    const clientsSection = document.getElementById('ellos-confian');
    if (clientsSection) {
      clientsObserver.observe(clientsSection);
    }

    const conversemosSection = document.getElementById('conversemos');
    if (conversemosSection) {
      footerObserver.observe(conversemosSection);
    }
    
    const footerSection = document.getElementById('footer');
    if (footerSection) {
      footerObserver.observe(footerSection);
    }

    // Configurar efectos hover dinámicos para las cards de servicios
    const setupServiceCardHover = (cardRef: React.RefObject<HTMLDivElement | null>) => {
      if (cardRef.current) {
        const card = cardRef.current;
        const title = card.querySelector('.services-card-title');
        
        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -20,
            scale: 1.05,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
            duration: 0.30, // 0.4 / 1.35 = 0.30 (35% más rápido)
            ease: "power2.out"
          });
          
          if (title) {
            gsap.to(title, {
              scale: 1.1,
              duration: 0.22, // 0.3 / 1.35 = 0.22 (35% más rápido)
              ease: "power2.out"
            });
          }
        };
        
        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            duration: 0.30, // 0.4 / 1.35 = 0.30 (35% más rápido)
            ease: "power2.out"
          });
          
          if (title) {
            gsap.to(title, {
              scale: 1,
              duration: 0.22, // 0.3 / 1.35 = 0.22 (35% más rápido)
              ease: "power2.out"
            });
          }
        };
        
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    };

    // Configurar efectos hover dinámicos para las cards de ADN
    const setupAdnCardHover = (cardRef: React.RefObject<HTMLDivElement | null>) => {
      if (cardRef.current) {
        const card = cardRef.current;
        const icon = card.querySelector('.adn-card-icon');
        const title = card.querySelector('.adn-card-title');
        
        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -15,
            scale: 1.03,
            boxShadow: "0 20px 40px -10px rgba(255, 255, 255, 0.1)",
            background: "rgba(255, 255, 255, 0.15)",
            duration: 0.30, // 0.4 / 1.35 = 0.30 (35% más rápido)
            ease: "power2.out"
          });
          
          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              rotation: 10,
              duration: 0.22, // 0.3 / 1.35 = 0.22 (35% más rápido)
              ease: "back.out(1.7)"
            });
          }
          
          if (title) {
            gsap.to(title, {
              scale: 1.05,
              duration: 0.22, // 0.3 / 1.35 = 0.22 (35% más rápido)
              ease: "power2.out"
            });
          }
        };
        
        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "none",
            background: "rgba(255, 255, 255, 0.1)",
            duration: 0.30, // 0.4 / 1.35 = 0.30 (35% más rápido)
            ease: "power2.out"
          });
          
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.22, // 0.3 / 1.35 = 0.22 (35% más rápido)
              ease: "power2.out"
            });
          }
          
          if (title) {
            gsap.to(title, {
              scale: 1,
              duration: 0.22, // 0.3 / 1.35 = 0.22 (35% más rápido)
              ease: "power2.out"
            });
          }
        };
        
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    };

    // Configurar hover para todas las cards de servicios
    const cleanupServices1 = setupServiceCardHover(servicesCard1Ref);
    const cleanupServices2 = setupServiceCardHover(servicesCard2Ref);
    const cleanupServices3 = setupServiceCardHover(servicesCard3Ref);
    const cleanupServices4 = setupServiceCardHover(servicesCard4Ref);

    // Configurar animaciones para elementos creativos del fondo ADN
    const setupCreativeBackgroundAnimations = () => {
      // Seleccionar todos los isotipos flotantes
      const isotopes = document.querySelectorAll('.creative-isotope');
      
      // Animación flotante para todos los isotipos
      isotopes.forEach((isotope, index) => {
        // Movimiento flotante más amplio y rápido (25% más velocidad)
        gsap.to(isotope, {
          y: "+=25", // Aumentado de 15 a 25 (más trayectoria)
          x: "+=20", // Aumentado de 10 a 20 (más trayectoria horizontal)
          rotation: "+=8", // Aumentado de 3 a 8 (más rotación)
          duration: (3.5 + index * 0.5) * 0.75, // 25% más rápido (multiplica por 0.75)
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          delay: (index * 0.3) * 0.75 // 25% más rápido en delays también
        });
        
        // Pulso sutil en la opacidad para crear efecto "respiración" más rápido
        gsap.to(isotope, {
          opacity: (isotope as HTMLElement).style.opacity ? parseFloat((isotope as HTMLElement).style.opacity) * 0.7 : 0.15,
          duration: (2.5 + index * 0.4) * 0.75, // 25% más rápido
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: (index * 0.2) * 0.75 // 25% más rápido
        });
        
        // Escala más pronunciada y rápida para dar más vida
        gsap.to(isotope, {
          scale: 1.08, // Aumentado de 1.05 a 1.08 (más escala)
          duration: (4 + index * 0.3) * 0.75, // 25% más rápido
          ease: "power1.inOut", 
          repeat: -1,
          yoyo: true,
          delay: (index * 0.4) * 0.75 // 25% más rápido
        });
        
        // Movimiento circular adicional para más dinamismo
        gsap.to(isotope, {
          motionPath: {
            path: `M0,0 Q${15 + index * 3},${-10 - index * 2} ${30 + index * 5},0 T${60 + index * 8},0`, // Trayectoria curva más amplia
            autoRotate: false,
          },
          duration: (6 + index * 0.8) * 0.75, // 25% más rápido
          ease: "none",
          repeat: -1,
          yoyo: true,
          delay: (index * 0.5) * 0.75 // 25% más rápido
        });
      });
    };

    // Configurar hover para todas las cards de ADN
    const cleanupAdn1 = setupAdnCardHover(adnColumn1Ref);
    const cleanupAdn2 = setupAdnCardHover(adnColumn2Ref);
    const cleanupAdn3 = setupAdnCardHover(adnColumn3Ref);
    
    // Configurar hover para las cards de socios
    const cleanupSocio1 = setupAdnCardHover(socio1Ref);
    const cleanupSocio2 = setupAdnCardHover(socio2Ref);
    const cleanupSocio3 = setupAdnCardHover(socio3Ref);
    const cleanupSocio4 = setupAdnCardHover(socio4Ref);

    // Configurar animaciones para el fondo creativo
    setupCreativeBackgroundAnimations();

    // Configurar scroll automático cuando se carga la página con hash
    const handleInitialScroll = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash;
        if (hash) {
          // Esperar menos tiempo para que el scroll sea más inmediato
          setTimeout(() => {
            const targetId = hash.replace('#', '');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 300); // Reducido de 1000ms a 300ms para mayor fluidez
        }
      }
    };

    // Configurar función global de scroll para la navegación
    if (typeof window !== 'undefined') {
      const windowWithScroll = window as Window & { scrollToSection?: (href: string) => void };
      windowWithScroll.scrollToSection = (href: string) => {
        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }

    // Ejecutar scroll automático
    handleInitialScroll();

    // Cleanup de event listeners
    return () => {
      adnObserver.disconnect();
      servicesObserver.disconnect();
      clientsObserver.disconnect();
      footerObserver.disconnect();
      cleanupServices1?.();
      cleanupServices2?.();
      cleanupServices3?.();
      cleanupServices4?.();
      cleanupAdn1?.();
      cleanupAdn2?.();
      cleanupAdn3?.();
      cleanupSocio1?.();
      cleanupSocio2?.();
      cleanupSocio3?.();
      cleanupSocio4?.();
    };
  }, [animateIn, gsap]);

  return (
    <>
      <header>
        <Navigation />
      </header>
      
      <main>
        {/* Sección Hero - Bienvenidos */}
        <section 
          id="bienvenidos" 
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
        {/* Fondo con patrón tecnológico neural */}
        <div className="absolute inset-0 z-0">
          <svg 
            className="w-full h-full opacity-20" 
            viewBox="0 0 1920 1080" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Grid base tecnológico */}
            <defs>
              <pattern id="neural-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1"/>
              </pattern>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <rect width="100%" height="100%" fill="url(#neural-grid)" />
            
            {/* Nodos neurales conectados */}
            {Array.from({ length: 15 }, (_, i) => {
              const x = (i % 5) * 384 + 192;
              const y = Math.floor(i / 5) * 270 + 135;
              return (
                <g key={i}>
                  <circle 
                    cx={x} 
                    cy={y} 
                    r="4" 
                    fill="#3b82f6" 
                    filter="url(#glow)"
                    className="animate-pulse"
                    style={{ 
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: '3s'
                    }}
                  />
                  {/* Conexiones entre nodos */}
                  {i < 10 && (
                    <line 
                      x1={x} 
                      y1={y} 
                      x2={(i + 5) % 5 * 384 + 192} 
                      y2={Math.floor((i + 5) / 5) * 270 + 135}
                      stroke="rgba(59, 130, 246, 0.3)" 
                      strokeWidth="1"
                      className="animate-pulse"
                      style={{ 
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: '4s'
                      }}
                    />
                  )}
                  {i % 5 < 4 && (
                    <line 
                      x1={x} 
                      y1={y} 
                      x2={x + 384} 
                      y2={y}
                      stroke="rgba(99, 102, 241, 0.2)" 
                      strokeWidth="1"
                      className="animate-pulse"
                      style={{ 
                        animationDelay: `${i * 0.4}s`,
                        animationDuration: '5s'
                      }}
                    />
                  )}
                </g>
              );
            })}

            {/* Partículas flotantes */}
            {Array.from({ length: 20 }, (_, i) => {
              // Valores predeterminados fijos para evitar problemas de hidratación
              const positions = [
                { x: 150, y: 200, r: 2.1, color: '59, 130, 246', delay: 0.5, duration: 6 },
                { x: 800, y: 150, r: 1.8, color: '99, 102, 241', delay: 1.2, duration: 5.5 },
                { x: 1200, y: 300, r: 2.5, color: '59, 130, 246', delay: 2.1, duration: 4.8 },
                { x: 300, y: 500, r: 1.5, color: '99, 102, 241', delay: 0.8, duration: 6.2 },
                { x: 1600, y: 400, r: 2.2, color: '59, 130, 246', delay: 1.8, duration: 5.1 },
                { x: 500, y: 700, r: 1.9, color: '99, 102, 241', delay: 3.2, duration: 4.5 },
                { x: 1400, y: 600, r: 2.4, color: '59, 130, 246', delay: 2.5, duration: 5.8 },
                { x: 200, y: 850, r: 1.7, color: '99, 102, 241', delay: 1.5, duration: 6.1 },
                { x: 900, y: 750, r: 2.0, color: '59, 130, 246', delay: 3.8, duration: 4.9 },
                { x: 1700, y: 250, r: 1.6, color: '99, 102, 241', delay: 0.3, duration: 5.7 },
                { x: 400, y: 950, r: 2.3, color: '59, 130, 246', delay: 2.9, duration: 5.3 },
                { x: 1100, y: 800, r: 1.4, color: '99, 102, 241', delay: 1.1, duration: 6.4 },
                { x: 700, y: 350, r: 2.1, color: '59, 130, 246', delay: 4.2, duration: 4.7 },
                { x: 1500, y: 950, r: 1.8, color: '99, 102, 241', delay: 0.7, duration: 5.9 },
                { x: 100, y: 600, r: 2.6, color: '59, 130, 246', delay: 3.5, duration: 5.2 },
                { x: 1300, y: 100, r: 1.3, color: '99, 102, 241', delay: 2.2, duration: 6.3 },
                { x: 600, y: 450, r: 2.0, color: '59, 130, 246', delay: 1.9, duration: 4.6 },
                { x: 1800, y: 750, r: 1.7, color: '99, 102, 241', delay: 3.1, duration: 5.4 },
                { x: 350, y: 150, r: 2.2, color: '59, 130, 246', delay: 0.9, duration: 5.0 },
                { x: 950, y: 550, r: 1.9, color: '99, 102, 241', delay: 2.7, duration: 6.0 }
              ];
              const particle = positions[i];
              
              return (
                <circle
                  key={`particle-${i}`}
                  cx={particle.x}
                  cy={particle.y}
                  r={particle.r}
                  fill={`rgba(${particle.color}, 0.6)`}
                  className="animate-float"
                  style={{ 
                    animationDelay: `${particle.delay}s`,
                    animationDuration: `${particle.duration}s`
                  }}
                />
              );
            })}
          </svg>
        </div>

        {/* Gradiente overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-900/10 to-purple-900/20 z-10"></div>

        {/* Contenido principal */}
        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
          {/* Isotipo Creative Hut con animación flotante */}
          <div className="mb-8 animate-hero-float" style={{ animationDelay: '0.1s' }}>
            <Image 
              src="/brand/logos/isotipo-neon_celeste.svg" 
              alt="Creative Hut - Agencia Digital Costa Rica - Logo Principal"
              width={144}
              height={144}
              className="mx-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-hero-float">
            Creative Hut
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 animate-hero-float" style={{ animationDelay: '0.2s' }}>
            Agencia Creativa Digital
          </p>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-hero-float" style={{ animationDelay: '0.4s' }}>
            Transformamos ideas en experiencias digitales extraordinarias que conectan, 
            inspiran y generan resultados excepcionales para tu marca.
          </p>
        </div>
      </section>

      {/* Sección Nuestro ADN */}
      <section 
        id="nuestro-adn" 
        className="relative min-h-screen flex flex-col justify-center py-20 overflow-hidden"
      >
        {/* Fondo creativo con isotipos flotantes de Creative Hut */}
        <div className="absolute inset-0 z-0">
          {/* Isotipo Full Color - Grande */}
          <Image 
            src="/brand/logos/isotipo-fullcolor.svg" 
            alt="Creative Hut - Elemento decorativo de marca"
            width={92}
            height={92}
            className="creative-isotope absolute opacity-30"
            style={{ top: '15%', left: '20%' }}
          />
          
          {/* Isotipo Neon Celeste - Mediano */}
          <Image 
            src="/brand/logos/isotipo-neon_celeste.svg" 
            alt="Creative Hut - Elemento decorativo de marca"
            width={74}
            height={74}
            className="creative-isotope absolute opacity-25"
            style={{ top: '25%', right: '15%' }}
          />
          
          {/* Isotipo Neon Rosa - Pequeño */}
          <Image 
            src="/brand/logos/isotipo-neon_rosa.svg" 
            alt="Creative Hut - Elemento decorativo de marca"
            width={55}
            height={55}
            className="creative-isotope absolute opacity-20"
            style={{ top: '10%', left: '45%' }}
          />
          
          {/* Isotipo Full Color - Mediano */}
          <Image 
            src="/brand/logos/isotipo-fullcolor.svg" 
            alt="Creative Hut - Elemento decorativo de marca"
            width={83}
            height={83}
            className="creative-isotope absolute opacity-25"
            style={{ bottom: '30%', left: '10%' }}
          />
          
          {/* Isotipo Neon Celeste - Grande */}
          <Image 
            src="/brand/logos/isotipo-neon_celeste.svg" 
            alt="Creative Hut - Elemento decorativo de marca"
            width={101}
            height={101}
            className="creative-isotope absolute opacity-30"
            style={{ bottom: '20%', right: '25%' }}
          />
          
          {/* Isotipo Neon Rosa - Mediano */}
          <Image 
            src="/brand/logos/isotipo-neon_rosa.svg" 
            alt="Creative Hut - Elemento decorativo de marca"
            width={64}
            height={64}
            className="creative-isotope absolute opacity-25"
            style={{ top: '55%', left: '30%' }}
          />
          
          {/* Isotipo Full Color - Pequeño */}
          <Image 
            src="/brand/logos/isotipo-fullcolor.svg" 
            alt="Creative Hut - Elemento decorativo de marca"
            width={46}
            height={46}
            className="creative-isotope absolute opacity-20"
            style={{ bottom: '15%', left: '70%' }}
          />
          
          {/* Isotipo Neon Celeste - Pequeño */}
          <Image 
            src="/brand/logos/isotipo-neon_celeste.svg" 
            alt="Creative Hut - Elemento decorativo de marca"
            width={55}
            height={55}
            className="creative-isotope absolute opacity-25"
            style={{ top: '40%', right: '10%' }}
          />
          
          {/* Isotipo Neon Rosa - Grande */}
          <Image 
            src="/brand/logos/isotipo-neon_rosa.svg" 
            alt="Creative Hut - Elemento decorativo de marca"
            width={92}
            height={92}
            className="creative-isotope absolute opacity-30"
            style={{ bottom: '45%', right: '5%' }}
          />
          
          {/* Isotipo Full Color - Extra Pequeño */}
          <Image 
            src="/brand/logos/isotipo-fullcolor.svg" 
            alt="Creative Hut - Elemento decorativo de marca"
            width={37}
            height={37}
            className="creative-isotope absolute opacity-15"
            style={{ top: '70%', left: '60%' }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 
              ref={adnTitleRef}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Nuestro ADN
            </h2>
            <div 
              ref={adnLineRef}
              className="h-1 bg-gradient-to-r from-pink-500 to-cyan-500 mx-auto"
            ></div>
          </div>
          
          {/* Primera fila: Misión, Visión y Valores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-16">
            <div ref={adnColumn1Ref} className="text-center p-6 sm:p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 cursor-pointer transition-all duration-200">
              <div className="adn-card-icon w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="adn-card-title text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Misión</h3>
              <p className="text-sm sm:text-base text-gray-300">Impulsar a otras empresas a través de los procesos creativos en marketing digital y producción de contenido, ofreciendo a nuestros clientes y aliados estratégicos las herramientas para potenciar sus marcas, transmitiendo conocimiento y optimizando sus metodologías.</p>
            </div>

            <div ref={adnColumn2Ref} className="text-center p-6 sm:p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 cursor-pointer transition-all duration-200">
              <div className="adn-card-icon w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="adn-card-title text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Visión</h3>
              <p className="text-sm sm:text-base text-gray-300">Ser la empresa líder nacional con reconocimiento internacional en el desarrollo de procesos creativos en marketing digital y producción de contenido, ofreciéndole a nuestros clientes confianza, credibilidad, crecimiento continuo y por sobre todo innovación, buscando siempre  el crecimiento de las marcas que representamos.</p>
            </div>

            <div ref={adnColumn3Ref} className="text-center p-6 sm:p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 cursor-pointer transition-all duration-200">
              <div className="adn-card-icon w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="adn-card-title text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Valores</h3>
              <p className="text-sm sm:text-base text-gray-300">Pasión por la excelencia, compromiso con la innovación, transparencia en nuestras relaciones y respeto por cada proyecto.</p>
            </div>
          </div>

          {/* Segunda fila: Nuestro Equipo */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Nuestro Equipo</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <div ref={socio1Ref} className="text-center p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 cursor-pointer transition-all duration-200">
              <div className="adn-card-icon w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <svg className="w-14 h-14 sm:w-16 sm:h-16 text-white" fill="currentColor" viewBox="0 0 100 100">
                  <defs>
                    <clipPath id="circle1">
                      <circle cx="50" cy="50" r="50"/>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#circle1)">
                    {/* Head */}
                    <ellipse cx="50" cy="35" rx="12" ry="15" fill="currentColor"/>
                    {/* Neck */}
                    <rect x="47" y="48" width="6" height="8" fill="currentColor"/>
                    {/* Suit jacket */}
                    <path d="M25 60 L35 58 L42 56 L50 55 L58 56 L65 58 L75 60 L75 100 L25 100 Z" fill="currentColor"/>
                    {/* Shirt collar */}
                    <path d="M42 56 L50 58 L58 56 L54 62 L50 64 L46 62 Z" fill="white" opacity="0.9"/>
                    {/* Tie */}
                    <path d="M48 58 L50 64 L52 58 L51 80 L50 82 L49 80 Z" fill="currentColor" opacity="0.7"/>
                    {/* Shoulders */}
                    <ellipse cx="38" cy="58" rx="8" ry="12" fill="currentColor"/>
                    <ellipse cx="62" cy="58" rx="8" ry="12" fill="currentColor"/>
                  </g>
                </svg>
              </div>
              <h4 className="adn-card-title text-base sm:text-lg font-bold text-white mb-2">Jonathan Jácamo</h4>
              <p className="text-sm text-purple-300 font-medium mb-1">Dirección Creativa</p>
              <p className="text-xs text-gray-400">Estrategia y Producción Digital</p>
            </div>

            <div ref={socio2Ref} className="text-center p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 cursor-pointer transition-all duration-200">
              <div className="adn-card-icon w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <svg className="w-14 h-14 sm:w-16 sm:h-16 text-white" fill="currentColor" viewBox="0 0 100 100">
                  <defs>
                    <clipPath id="circle2">
                      <circle cx="50" cy="50" r="50"/>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#circle2)">
                    {/* Head */}
                    <ellipse cx="50" cy="35" rx="12" ry="15" fill="currentColor"/>
                    {/* Hair */}
                    <path d="M35 25 Q50 20 65 25 Q65 35 62 38 Q50 32 38 38 Q35 35 35 25" fill="currentColor"/>
                    {/* Neck */}
                    <rect x="47" y="48" width="6" height="8" fill="currentColor"/>
                    {/* Blouse/Blazer */}
                    <path d="M25 60 L35 58 L42 56 L50 55 L58 56 L65 58 L75 60 L75 100 L25 100 Z" fill="currentColor"/>
                    {/* Collar */}
                    <path d="M42 56 L50 62 L58 56 L55 65 L50 66 L45 65 Z" fill="white" opacity="0.9"/>
                    {/* Shoulders */}
                    <ellipse cx="38" cy="58" rx="8" ry="12" fill="currentColor"/>
                    <ellipse cx="62" cy="58" rx="8" ry="12" fill="currentColor"/>
                  </g>
                </svg>
              </div>
              <h4 className="adn-card-title text-base sm:text-lg font-bold text-white mb-2">Brittney Rojas</h4>
              <p className="text-sm text-pink-300 font-medium mb-1">Comunicación</p>
              <p className="text-xs text-gray-400">Marketing Corporativo</p>
            </div>

            <div ref={socio3Ref} className="text-center p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 cursor-pointer transition-all duration-200">
              <div className="adn-card-icon w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <svg className="w-14 h-14 sm:w-16 sm:h-16 text-white" fill="currentColor" viewBox="0 0 100 100">
                  <defs>
                    <clipPath id="circle3">
                      <circle cx="50" cy="50" r="50"/>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#circle3)">
                    {/* Head */}
                    <ellipse cx="50" cy="35" rx="12" ry="15" fill="currentColor"/>
                    {/* Hair */}
                    <path d="M35 22 Q50 18 65 22 Q68 30 65 38 Q50 35 35 38 Q32 30 35 22" fill="currentColor"/>
                    {/* Neck */}
                    <rect x="47" y="48" width="6" height="8" fill="currentColor"/>
                    {/* Professional outfit */}
                    <path d="M25 60 L35 58 L42 56 L50 55 L58 56 L65 58 L75 60 L75 100 L25 100 Z" fill="currentColor"/>
                    {/* Professional collar */}
                    <path d="M42 56 L50 60 L58 56 L56 64 L50 65 L44 64 Z" fill="white" opacity="0.9"/>
                    {/* Shoulders */}
                    <ellipse cx="38" cy="58" rx="8" ry="12" fill="currentColor"/>
                    <ellipse cx="62" cy="58" rx="8" ry="12" fill="currentColor"/>
                  </g>
                </svg>
              </div>
              <h4 className="adn-card-title text-base sm:text-lg font-bold text-white mb-2">Verónica Chavarría</h4>
              <p className="text-sm text-emerald-300 font-medium mb-1">Dirección Administrativa</p>
              <p className="text-xs text-gray-400">Gestión y Operaciones</p>
            </div>

            <div ref={socio4Ref} className="text-center p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 cursor-pointer transition-all duration-200">
              <div className="adn-card-icon w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <svg className="w-14 h-14 sm:w-16 sm:h-16 text-white" fill="currentColor" viewBox="0 0 100 100">
                  <defs>
                    <clipPath id="circle4">
                      <circle cx="50" cy="50" r="50"/>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#circle4)">
                    {/* Head */}
                    <ellipse cx="50" cy="35" rx="12" ry="15" fill="currentColor"/>
                    {/* Hair */}
                    <path d="M38 25 Q50 22 62 25 Q62 32 60 35 Q50 30 40 35 Q38 32 38 25" fill="currentColor"/>
                    {/* Neck */}
                    <rect x="47" y="48" width="6" height="8" fill="currentColor"/>
                    {/* Business suit */}
                    <path d="M25 60 L35 58 L42 56 L50 55 L58 56 L65 58 L75 60 L75 100 L25 100 Z" fill="currentColor"/>
                    {/* Shirt and tie */}
                    <path d="M42 56 L50 58 L58 56 L54 62 L50 64 L46 62 Z" fill="white" opacity="0.9"/>
                    <path d="M48 58 L50 64 L52 58 L51 78 L50 80 L49 78 Z" fill="currentColor" opacity="0.7"/>
                    {/* Shoulders */}
                    <ellipse cx="38" cy="58" rx="8" ry="12" fill="currentColor"/>
                    <ellipse cx="62" cy="58" rx="8" ry="12" fill="currentColor"/>
                  </g>
                </svg>
              </div>
              <h4 className="adn-card-title text-base sm:text-lg font-bold text-white mb-2">Jose Ríler Solórzano</h4>
              <p className="text-sm text-orange-300 font-medium mb-1">Análisis de Negocio</p>
              <p className="text-xs text-gray-400">Desarrollo Tecnológico</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Lo que hacemos */}
      <section 
        id="lo-que-hacemos" 
        className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              ref={servicesTitleRef}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Lo que hacemos
            </h2>
            <div 
              ref={servicesLineRef}
              className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"
            ></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Card 1 - Marketing Digital */}
            <Link href="/servicios/marketing-digital">
              <div 
                ref={servicesCard1Ref}
                className="group p-8 rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 text-white transform transition-all duration-200 hover:shadow-2xl cursor-pointer"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3 className="services-card-title text-3xl font-bold mb-4">Marketing Digital</h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Creamos estrategias visuales y de contenido para impulsar tu marca en el entorno digital. Desde logos memorables hasta campañas en redes sociales, conectamos tu identidad con tu audiencia.
                  </p>
                </div>
                <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">Explorar servicio</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Card 2 - Producción Digital */}
            <Link href="/servicios/produccion-digital">
              <div 
                ref={servicesCard2Ref}
                className="group p-8 rounded-3xl bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700 text-white transform transition-all duration-200 hover:shadow-2xl cursor-pointer"
              >
              <div className="mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v2.586l2.707-2.707A1 1 0 0116 6.586V13.414a1 1 0 01-1.707.707L12 11.414V14a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                </div>
                <h3 className="services-card-title text-3xl font-bold mb-4">Producción Digital</h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  Producimos contenido audiovisual de alto impacto: reels, videos corporativos, transmisiones en vivo y más. Creamos piezas visuales que transmiten emociones y hacen que tu mensaje destaque en cada frame.
                </p>
              </div>
              <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                <span className="text-sm font-medium">Explorar servicio</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            </Link>

            {/* Card 3 - Eventos */}
            <Link href="/servicios/eventos">
              <div 
                ref={servicesCard3Ref}
                className="group p-8 rounded-3xl bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 text-white transform transition-all duration-200 hover:shadow-2xl cursor-pointer"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  </div>
                  <h3 className="services-card-title text-3xl font-bold mb-4">Eventos</h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Diseñamos y ejecutamos experiencias presenciales y virtuales memorables. Nos encargamos de cada detalle para que tu evento brille y deje huella.
                  </p>
                </div>
                <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">Explorar servicio</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Card 4 - Desarrollo */}
            <Link href="/servicios/desarrollo" className="block">
              <div 
                ref={servicesCard4Ref}
                className="group p-8 rounded-3xl bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-600 text-white transform transition-all duration-200 hover:shadow-2xl cursor-pointer"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="services-card-title text-3xl font-bold mb-4">Desarrollo</h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Creamos soluciones digitales robustas: páginas web, apps móviles y plataformas personalizadas para acelerar el crecimiento de tu negocio.
                  </p>
                </div>
                <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">Explorar servicio</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Sección Ellos confían en nosotros */}
      <section 
        id="ellos-confian" 
        className="py-20 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              ref={clientsTitleRef}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Ellos confían en nosotros
            </h2>
            <div 
              ref={clientsLineRef}
              className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto"
            ></div>
          </div>
          
          <div ref={clientsSwiperRef} className="">
            {/* Datos de clientes - Fácil mantenimiento */}
            {(() => {
              const clientsData = [
                {
                  id: 1,
                  name: "Cliente 1",
                  logo: "/logosClientes/cliente1.png",
                  description: "Soluciones innovadoras"
                },
                {
                  id: 2,
                  name: "Cliente 2", 
                  logo: "/logosClientes/cliente2.png",
                  description: "Transformación digital"
                },
                {
                  id: 3,
                  name: "Cliente 3",
                  logo: "/logosClientes/cliente3.png", 
                  description: "Experiencias únicas"
                },
                {
                  id: 4,
                  name: "Cliente 4",
                  logo: "/logosClientes/cliente4.png",
                  description: "Crecimiento sostenible"
                },
                {
                  id: 5,
                  name: "Cliente 5",
                  logo: "/logosClientes/cliente5.png",
                  description: "Innovación constante"
                }
              ];

              return (
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                  }}
                  speed={1000}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                  }}
                  className="clients-swiper"
                >
                  {clientsData.map((client) => (
                    <SwiperSlide key={client.id}>
                      <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl text-center border border-white/20 hover:bg-white/20 transition-all duration-200">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 p-3 overflow-hidden">
                          <Image 
                            src={client.logo} 
                            alt={`Logo ${client.name}`}
                            width={96}
                            height={96}
                            className="w-full h-full object-contain filter brightness-90 hover:brightness-100 transition-all duration-200"
                            onError={(e) => {
                              // Fallback si la imagen no carga
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = document.createElement('span');
                              fallback.className = 'text-gray-800 font-bold text-lg';
                              fallback.textContent = client.name.charAt(0);
                              target.parentElement?.appendChild(fallback);
                            }}
                          />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">{client.name}</h3>
                        <p className="text-gray-400 text-sm">{client.description}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              );
            })()}
          </div>
        </div>
      </section>
      </main>

      {/* Contact Form Component */}
      <ContactForm />
      
      {/* Schema.org adicional para LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://creativehutcr.com/#localbusiness",
            "name": "Creative Hut",
            "image": "https://creativehutcr.com/og-image.jpg",
            "telephone": "+506-8888-8888",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "San José",
              "addressLocality": "San José", 
              "addressRegion": "San José",
              "postalCode": "10101",
              "addressCountry": "CR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 9.9281,
              "longitude": -84.0907
            },
            "url": "https://creativehutcr.com",
            "sameAs": [
              "https://www.facebook.com/creativehutcr",
              "https://www.instagram.com/creativehutcr",
              "https://www.linkedin.com/company/creativehutcr"
            ],
            "priceRange": "$$",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday", 
                "Thursday",
                "Friday"
              ],
              "opens": "08:00",
              "closes": "17:00"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "25"
            }
          }),
        }}
      />
    </>
  );
}
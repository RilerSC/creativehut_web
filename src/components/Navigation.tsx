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

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAnimations } from '@/hooks/useAnimations';

export default function Navigation() {
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { fadeIn, gsap } = useAnimations();

  const navItems = [
    { name: 'Bienvenidos', href: '#bienvenidos' },
    { name: 'Nuestro ADN', href: '#nuestro-adn' },
    { name: 'Lo que hacemos', href: '#lo-que-hacemos' },
    // { name: 'Casos de éxito', href: '#casos-de-exito' },
    { name: 'Ellos confían', href: '#ellos-confian' },
    // { name: 'Historias Creativas', href: '#historias-creativas' },
    // { name: 'Conversemos', href: '#conversemos' },
  ];

  useEffect(() => {
    // Configurar estado inicial visible para todos los elementos
    if (navRef.current && logoRef.current && menuRef.current) {
      // Establecer estado inicial inmediatamente VISIBLE
      gsap.set(navRef.current, { y: 0, opacity: 1 });
      gsap.set(logoRef.current, { x: 0, opacity: 1 });
      gsap.set(menuRef.current.children, { y: 0, opacity: 1 });
      
      // Sin animación de entrada - aparece inmediatamente
    }

    // Configurar animaciones hover para enlaces
    const setupHoverAnimations = () => {
      const navLinks = navRef.current?.querySelectorAll('.nav-link');
      navLinks?.forEach((link) => {
        const element = link as HTMLElement;
        
        element.addEventListener('mouseenter', () => {
          gsap.to(element, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        element.addEventListener('mouseleave', () => {
          gsap.to(element, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    };

    // Configurar scroll listener para glassmorphism
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    setupHoverAnimations();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fadeIn, gsap]);

  // Función para manejar clicks en navegación
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Cerrar menú móvil
    
    // Verificar si estamos en la página principal
    const isHomePage = window.location.pathname === '/';
    
    if (isHomePage) {
      // Si estamos en home, hacer scroll directo a la sección
      if (typeof window !== 'undefined') {
        const windowWithScroll = window as Window & { scrollToSection?: (href: string) => void };
        if (windowWithScroll.scrollToSection) {
          windowWithScroll.scrollToSection(href);
        } else {
          // Fallback: usar scrollIntoView nativo
          const targetId = href.replace('#', '');
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    } else {
      // Si estamos en otra página, navegar al home con el hash usando router de Next.js
      // Esto evita la recarga completa de la página
      router.push(`/${href}`, { scroll: false });
    }
  };

  // Función para toggle del menú móvil
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    if (mobileMenuRef.current) {
      if (!isMobileMenuOpen) {
        gsap.fromTo(mobileMenuRef.current, 
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      }
    }
  };

  return (
    <nav 
      ref={navRef} 
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/10 backdrop-blur-md shadow-2xl border-b border-white/20' 
          : 'bg-transparent'
      }`}
      style={{ opacity: 1, transform: 'translateY(0)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <div ref={logoRef} className="flex-shrink-0" style={{ opacity: 1, transform: 'translateX(0)' }}>
            <Link 
              href="/" 
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:from-purple-400 hover:to-blue-400 transition-all duration-300"
            >
              Creative Hut
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:block">
            <div ref={menuRef} className="ml-10 flex items-center space-x-8" style={{ opacity: 1 }}>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="nav-link relative text-white font-medium hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text px-4 py-2 text-sm transition-all duration-300 cursor-pointer group"
                  style={{ opacity: 1, transform: 'translateY(0)' }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-white hover:text-blue-400 focus:outline-none focus:text-white transition-colors duration-200 p-2"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden bg-black/30 backdrop-blur-md border-t border-white/10 shadow-2xl"
          >
            <div className="px-2 pt-4 pb-6 space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-white hover:text-blue-400 hover:bg-white/10 block px-4 py-3 text-base font-medium cursor-pointer rounded-lg transition-all duration-200"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

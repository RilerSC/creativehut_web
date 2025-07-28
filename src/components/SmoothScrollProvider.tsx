'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Inicializar Lenis con configuración optimizada
    const lenis = new Lenis({
      duration: 1.5,                    // Duración del scroll suave
      easing: (t) => {                 // Función de easing personalizada
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      touchMultiplier: 2,              // Multiplicador para dispositivos touch
      infinite: false,                 // Sin scroll infinito
    });

    lenisRef.current = lenis;

    // Función RAF optimizada para rendimiento
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Iniciar el loop de animación
    requestAnimationFrame(raf);

    // Event listeners para debugging (opcional)
    lenis.on('scroll', () => {
      // console.log('Scrolling');
    });

    // Integración con enlaces anchor
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id!);
        if (element) {
          lenis.scrollTo(element, {
            duration: 2,
            easing: (t) => 1 - Math.pow(1 - t, 3),
          });
        }
      }
    };

    // Agregar listener para enlaces anchor
    document.addEventListener('click', handleAnchorClick);

    // Cleanup completo
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Función para scroll programático (exportada globalmente)
  useEffect(() => {
    if (typeof window !== 'undefined' && lenisRef.current) {
      (window as Window & { scrollToSection?: (selector: string) => void }).scrollToSection = (selector: string) => {
        const element = document.querySelector(selector) as HTMLElement;
        if (element && lenisRef.current) {
          lenisRef.current.scrollTo(element, {
            duration: 2,
            easing: (t) => 1 - Math.pow(1 - t, 3),
          });
        }
      };
    }
  }, []);

  return <>{children}</>;
}

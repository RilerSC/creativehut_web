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

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useAnimations() {
  // Función helper para animaciones GSAP básicas
  const animateIn = (element: HTMLElement | string, options = {}) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 30,
        ...options,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.59, // 0.8 / 1.35 = 0.59 (35% más rápido)
        ease: 'power2.out',
        ...options,
      }
    );
  };

  const animateOut = (element: HTMLElement | string, options = {}) => {
    return gsap.to(element, {
      opacity: 0,
      y: -30,
      duration: 0.37, // 0.5 / 1.35 = 0.37 (35% más rápido)
      ease: 'power2.in',
      ...options,
    });
  };

  const fadeIn = (element: HTMLElement | string, options = {}) => {
    return gsap.fromTo(
      element,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.44, // 0.6 / 1.35 = 0.44 (35% más rápido)
        ease: 'power1.out',
        ...options,
      }
    );
  };

  const slideInFromLeft = (element: HTMLElement | string, options = {}) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.59, // 0.8 / 1.35 = 0.59 (35% más rápido)
        ease: 'power2.out',
        ...options,
      }
    );
  };

  const slideInFromRight = (element: HTMLElement | string, options = {}) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.59, // 0.8 / 1.35 = 0.59 (35% más rápido)
        ease: 'power2.out',
        ...options,
      }
    );
  };

  return {
    animateIn,
    animateOut,
    fadeIn,
    slideInFromLeft,
    slideInFromRight,
    gsap, // Exportamos gsap para uso directo si es necesario
    ScrollTrigger, // Exportamos ScrollTrigger
  };
}
/**
 * ===============================================
 * CREATIVE HUT WEBSITE - PROPIEDAD INTELECTUAL
 * ===============================================
 * 
 * Desarrollado por: Ing. José Ríler Solórzano Campos
 * Empresa: DEVIT506
 * Website: www.devit506.net
 * Fecha: 31 de agosto de 2025
 * 
 * © 2025 José Ríler Solórzano Campos - DEVIT506
 * Todos los derechos reservados.
 * 
 * Este código es propiedad intelectual exclusiva del 
 * desarrollador y no puede ser reproducido, distribuido
 * o modificado sin autorización expresa por escrito.
 * ===============================================
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creative Hut Live - Transmisiones Exclusivas | Creative Hut',
  description: 'Accede a nuestras transmisiones en vivo exclusivas: webinars, eventos, sorteos y workshops. Contenido premium solo para nuestra comunidad.',
  keywords: [
    'transmisión en vivo',
    'webinars marketing digital',
    'eventos creativos',
    'sorteos exclusivos',
    'workshops diseño',
    'streaming privado',
    'Creative Hut Live',
    'contenido exclusivo'
  ],
  authors: [{ name: 'Creative Hut', url: 'https://creativehut.com' }],
  creator: 'Creative Hut',
  publisher: 'Creative Hut',
  robots: {
    index: false, // No indexar para mantener exclusividad
    follow: true,
    nocache: true,
    noarchive: true,
    nosnippet: true
  },
  openGraph: {
    title: 'Creative Hut Live - Transmisiones Exclusivas',
    description: 'Contenido en vivo exclusivo para nuestra comunidad. Webinars, eventos y workshops premium.',
    url: 'https://creativehut.com/live',
    siteName: 'Creative Hut',
    images: [
      {
        url: '/og-live.jpg',
        width: 1200,
        height: 630,
        alt: 'Creative Hut Live - Transmisiones Exclusivas'
      }
    ],
    locale: 'es_ES',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creative Hut Live - Transmisiones Exclusivas',
    description: 'Accede a contenido premium en vivo: webinars, eventos y workshops exclusivos.',
    images: ['/og-live.jpg'],
    creator: '@creativehut'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
  },
  themeColor: '#8b5cf6',
  colorScheme: 'dark',
  manifest: '/manifest.json'
};

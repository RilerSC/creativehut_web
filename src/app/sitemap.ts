/**
 * ===============================================
 * CREATIVE HUT WEBSITE - SITEMAP DINÁMICO
 * ===============================================
 * 
 * Desarrollado por: Ing. José Ríler Solórzano Campos
 * Empresa: DEVIT506
 * Website: www.devit506.net
 * Fecha: 2 de agosto de 2025
 * 
 * © 2025 José Ríler Solórzano Campos - DEVIT506
 * Todos los derechos reservados.
 * ===============================================
 */

import { MetadataRoute } from 'next'

// Configuración para forzar generación estática
export const dynamic = 'force-static'

/**
 * Genera sitemap.xml dinámico para Creative Hut
 * @description Crea automáticamente el sitemap con todas las páginas del sitio
 * @returns {MetadataRoute.Sitemap} Configuración del sitemap para Next.js
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://creativehutcr.com'
  const lastModified = new Date()

  return [
    // Página principal
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Servicios - Desarrollo Web
    {
      url: `${baseUrl}/servicios/desarrollo`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Servicios - Marketing Digital
    {
      url: `${baseUrl}/servicios/marketing-digital`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Servicios - Producción Digital
    {
      url: `${baseUrl}/servicios/produccion-digital`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Servicios - Eventos
    {
      url: `${baseUrl}/servicios/eventos`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]
}

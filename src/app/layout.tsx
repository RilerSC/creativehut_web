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

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AnimationProvider from "@/components/AnimationProvider";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creative Hut | Agencia Digital Costa Rica - Web, Marketing, Eventos",
  description: "Agencia digital en Costa Rica especializada en desarrollo web, marketing digital, producción audiovisual y eventos. Transformamos ideas en realidad digital.",
  keywords: ["agencia digital costa rica", "desarrollo web", "marketing digital", "producción audiovisual", "eventos corporativos", "creative hut"],
  authors: [{ name: "Creative Hut" }],
  creator: "Creative Hut",
  publisher: "Creative Hut",
  alternates: {
    canonical: "https://creativehutcr.com/",
  },
  openGraph: {
    title: "Creative Hut | Agencia Digital Costa Rica",
    description: "Transformamos ideas en experiencias digitales extraordinarias. Desarrollo web, marketing digital, producción audiovisual y eventos corporativos.",
    url: "https://creativehutcr.com/",
    siteName: "Creative Hut",
    images: [
      {
        url: "https://creativehutcr.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Creative Hut - Agencia Digital Costa Rica",
      },
    ],
    locale: "es_CR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Hut | Agencia Digital Costa Rica",
    description: "Transformamos ideas en experiencias digitales extraordinarias. Desarrollo web, marketing digital, producción audiovisual y eventos.",
    images: ["https://creativehutcr.com/og-image.jpg"],
    creator: "@creativehutcr",
    site: "@creativehutcr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org datos estructurados para la organización
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Creative Hut",
    "alternateName": "Creative Hut Costa Rica",
    "url": "https://creativehutcr.com",
    "logo": "https://creativehutcr.com/brand/logos/isotipo-fullcolor.svg",
    "image": "https://creativehutcr.com/og-image.jpg",
    "description": "Agencia digital en Costa Rica especializada en desarrollo web, marketing digital, producción audiovisual y eventos corporativos.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CR",
      "addressRegion": "San José",
      "addressLocality": "Costa Rica"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Spanish", "English"]
    },
    "sameAs": [
      "https://www.facebook.com/creativehutcr",
      "https://www.instagram.com/creativehutcr",
      /* "https://www.linkedin.com/company/creativehutcr",
      "https://twitter.com/creativehutcr" */
    ],
    "foundingDate": "2020",
    "founders": [
      {
        "@type": "Person",
        "name": "Jonathan Jácamo"
      },
      {
        "@type": "Person", 
        "name": "Brittney Rojas"
      }
    ],
    "employee": [
      {
        "@type": "Person",
        "name": "Verónica Chavarría",
        "jobTitle": "Especialista en Marketing"
      },
      {
        "@type": "Person",
        "name": "Jose Ríler Solórzano",
        "jobTitle": "Desarrollador Web"
      }
    ],
    "serviceArea": {
      "@type": "Country",
      "name": "Costa Rica"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios Digitales",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Desarrollo Web",
            "description": "Creación de sitios web, aplicaciones y plataformas digitales profesionales"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Marketing Digital",
            "description": "Estrategias de marketing digital, publicidad y gestión de redes sociales"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Producción Audiovisual",
            "description": "Videos corporativos, campañas publicitarias y contenido audiovisual"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Eventos Corporativos",
            "description": "Producción integral de eventos empresariales e institucionales"
          }
        }
      ]
    }
  };

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScrollProvider>
          <AnimationProvider>
            {children}
          </AnimationProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

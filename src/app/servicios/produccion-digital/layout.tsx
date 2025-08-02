import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Producción Digital | Creative Hut - Video Costa Rica",
  description: "Producción de contenido audiovisual en Costa Rica. Videos corporativos, campañas publicitarias y producciones de alto impacto para tu marca.",
  keywords: ["producción audiovisual costa rica", "videos corporativos", "contenido audiovisual", "campañas publicitarias", "creative hut video"],
  alternates: {
    canonical: "https://creativehutcr.com/servicios/produccion-digital/",
  },
  openGraph: {
    title: "Producción Digital | Creative Hut - Video Costa Rica",
    description: "Videos corporativos, campañas publicitarias y producciones de alto impacto para tu marca. Contenido audiovisual profesional en Costa Rica.",
    url: "https://creativehutcr.com/servicios/produccion-digital/",
    siteName: "Creative Hut",
    images: [
      {
        url: "https://creativehutcr.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Producción Digital - Creative Hut Costa Rica",
      },
    ],
    locale: "es_CR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Producción Digital | Creative Hut",
    description: "Videos corporativos, campañas publicitarias y producciones de alto impacto para tu marca en Costa Rica.",
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

export default function ProduccionDigitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

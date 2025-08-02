import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Digital | Creative Hut - Publicidad Costa Rica",
  description: "Servicios de marketing digital y publicidad en Costa Rica. Transformamos ideas en contenido visual con propósito, claridad y estilo para tu marca.",
  keywords: ["marketing digital costa rica", "publicidad digital", "redes sociales", "contenido digital", "campañas publicitarias", "creative hut marketing"],
  alternates: {
    canonical: "https://creativehutcr.com/servicios/marketing-digital/",
  },
  openGraph: {
    title: "Marketing Digital | Creative Hut - Publicidad Costa Rica",
    description: "Transformamos ideas en contenido visual con propósito, claridad y estilo para tu marca. Servicios de marketing digital en Costa Rica.",
    url: "https://creativehutcr.com/servicios/marketing-digital/",
    siteName: "Creative Hut",
    images: [
      {
        url: "https://creativehutcr.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Marketing Digital - Creative Hut Costa Rica",
      },
    ],
    locale: "es_CR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Digital | Creative Hut",
    description: "Transformamos ideas en contenido visual con propósito, claridad y estilo para tu marca en Costa Rica.",
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

export default function MarketingDigitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

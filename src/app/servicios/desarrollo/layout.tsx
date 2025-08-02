import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desarrollo Web | Creative Hut - Agencia Digital Costa Rica",
  description: "Desarrollo web profesional en Costa Rica. Creamos sitios web, aplicaciones y plataformas digitales que conectan, convierten y escalan con tu negocio.",
  keywords: ["desarrollo web costa rica", "sitios web", "aplicaciones web", "ecommerce", "creative hut", "páginas web empresariales"],
  alternates: {
    canonical: "https://creativehutcr.com/servicios/desarrollo/",
  },
  openGraph: {
    title: "Desarrollo Web Profesional | Creative Hut Costa Rica",
    description: "Creamos sitios web, aplicaciones y plataformas digitales que conectan, convierten y escalan con tu negocio en Costa Rica.",
    url: "https://creativehutcr.com/servicios/desarrollo/",
    siteName: "Creative Hut",
    images: [
      {
        url: "https://creativehutcr.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Desarrollo Web - Creative Hut Costa Rica",
      },
    ],
    locale: "es_CR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desarrollo Web Profesional | Creative Hut",
    description: "Sitios web, aplicaciones y plataformas digitales que conectan, convierten y escalan con tu negocio en Costa Rica.",
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

export default function DesarrolloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

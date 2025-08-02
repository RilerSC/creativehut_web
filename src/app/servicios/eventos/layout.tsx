import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventos Corporativos | Creative Hut Costa Rica",
  description: "Producción integral de eventos corporativos, institucionales y comerciales en Costa Rica. Conectamos, inspiramos y dejamos huella en cada evento.",
  keywords: ["eventos corporativos costa rica", "producción de eventos", "eventos empresariales", "activaciones de marca", "creative hut eventos"],
  alternates: {
    canonical: "https://creativehutcr.com/servicios/eventos/",
  },
  openGraph: {
    title: "Eventos Corporativos | Creative Hut Costa Rica",
    description: "Producción integral de eventos corporativos, institucionales y comerciales. Conectamos, inspiramos y dejamos huella en cada evento.",
    url: "https://creativehutcr.com/servicios/eventos/",
    siteName: "Creative Hut",
    images: [
      {
        url: "https://creativehutcr.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eventos Corporativos - Creative Hut Costa Rica",
      },
    ],
    locale: "es_CR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventos Corporativos | Creative Hut",
    description: "Producción integral de eventos corporativos, institucionales y comerciales en Costa Rica.",
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

export default function EventosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

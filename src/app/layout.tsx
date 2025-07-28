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
  title: "Creative Hut - Agencia Digital",
  description: "Agencia digital especializada en soluciones creativas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración para exportación estática
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Desactivamos turbopack temporalmente para evitar errores
  experimental: {
    turbo: undefined
  },
  // Configuración para GSAP y animaciones
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

export default nextConfig;

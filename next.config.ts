import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // HTML, CSS y JS estáticos en out/. Sin servidor Node en el hosting.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Los mapas de producción no deben publicarse en public_html.
  productionBrowserSourceMaps: false,
  // El módulo de correo importa nodemailer, que toca fs. El sitio estático no lo empaqueta.
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

export default nextConfig;

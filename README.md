# 🎨 Creative Hut Website

Sitio web corporativo moderno para Creative Hut - Agencia de marketing digital y producción creativa en Costa Rica.

## ✨ Características

### 🎯 Páginas Principales
- **Landing Page**: Presentación moderna con hero animado y secciones de servicios
- **Producción Digital**: Servicios de fotografía, video y contenido multimedia
- **Publicidad Digital**: Campañas en redes sociales y marketing digital
- **Marketing Digital**: Estrategias integrales de marketing online
- **Eventos**: Organización y producción de eventos corporativos
- **Desarrollo**: Desarrollo web y aplicaciones personalizadas

### 📧 Sistema de Email
- Integración con Microsoft 365 SMTP
- Formulario de contacto funcional con validación
- Templates HTML profesionales
- Confirmación de envío automática

### 🎨 UI/UX
- Diseño responsive mobile-first
- Animaciones flotantes suaves
- Gradientes modernos por servicio
- Navegación intuitiva entre secciones
- Scroll-to-top automático

### 📱 Integraciones
- Botón de WhatsApp directo (+506 7281 1381)
- SEO optimizado con robots.txt
- Compatibilidad completa con Safari
- Static export ready para hosting

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15.3.5 con App Router
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Email**: Nodemailer + Microsoft 365 SMTP
- **Deployment**: Static export compatible

## 🚀 Desarrollo Local

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar repositorio
git clone https://github.com/RilerSC/creativehut_web.git
cd creativehut_web

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Microsoft 365

# Ejecutar en desarrollo
npm run dev
```

### Configuración de Email
Crear `.env.local` con:
```env
EMAIL_USER=tu_email@creativehutcr.com
EMAIL_PASS=tu_password_de_aplicacion
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
```

## 📦 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linting con ESLint
```

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── api/               # API Routes
│   │   └── send-email/    # Endpoint de envío de emails
│   ├── servicios/         # Páginas de servicios
│   │   ├── produccion-digital/
│   │   ├── publicidad-digital/
│   │   ├── marketing-digital/
│   │   ├── eventos/
│   │   └── desarrollo/
│   ├── globals.css        # Estilos globales + Tailwind
│   ├── layout.tsx         # Layout principal
│   └── page.tsx          # Página de inicio
├── components/            # Componentes reutilizables
│   ├── ContactForm.tsx    # Formulario de contacto
│   ├── Navigation.tsx     # Navegación principal
│   └── AnimationProvider.tsx
└── hooks/                 # Custom hooks
    └── useAnimations.ts
```

## 🌐 Deploy

### Build de Producción
```bash
npm run build
```

### Hosting Estático
El proyecto está configurado para export estático en `next.config.ts`:
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

## 📞 Contacto

- **Email**: web@creativehutcr.com
- **WhatsApp**: +506 7281 1381
- **Website**: https://creativehutcr.com

## 📄 Licencia

Proyecto privado © 2025 Creative Hut Costa Rica

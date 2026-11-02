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

### 📧 Contacto
- En el sitio estático, el formulario abre el correo del visitante (`mailto:hola@creativehutcr.com`) con el mensaje ya escrito. No confirma la entrega.
- El envío SMTP con Nodemailer queda en `src/server/email/contact-mailer.ts` y solo funciona cuando haya un servidor Node (Vercel).

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

- **Framework**: Next.js 15.5.28 con App Router, export estático (`out/`)
- **Frontend**: React 19.3.1 + TypeScript
- **Styling**: Tailwind CSS v4
- **Animación**: GSAP, Lenis y Swiper, empaquetados en el propio sitio
- **Email en servidor**: Nodemailer 10, inactivo en cPanel
- **Node**: 24.22.1 o superior (`.nvmrc`)

## 🚀 Desarrollo Local

### Prerrequisitos
- Node.js 24.22.1 o superior (`nvm use` lee `.nvmrc`)
- npm

### Instalación
```bash
# Clonar repositorio
git clone https://github.com/RilerSC/creativehut_web.git
cd creativehut_web

# Instalar dependencias
npm install

# Plantilla de variables. El sitio estático no las necesita para publicarse.
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
```

El esquema de variables es solo el de `.env.example` (`SMTP_*` y `NEXT_PUBLIC_*`). No uses `EMAIL_*` ni `GMAIL_*`.

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
├── app/                    # App Router. Sin rutas /api en el export estático.
│   ├── servicios/         # Páginas de servicios
│   │   ├── produccion-digital/
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
├── hooks/
│   └── useAnimations.ts
└── server/email/           # Nodemailer. No se publica en out/.
    └── contact-mailer.ts
```

## Publicar en cPanel

El servidor no compila. Node 16, el predeterminado del hosting, no sirve para Next.js 15. `.cpanel.yml` no ejecuta `npm ci` ni `npm run build`.

1. En tu máquina, con Node 24.22.1 o superior: `npm ci` y `npm run build`.
2. El resultado es la carpeta `out/`. Incluye `.htaccess`.
3. En cPanel, desactiva el despliegue Git que copia el repositorio dentro de `public_html`. Si el repo queda en la raíz web, se publican el código, `.git` y los Markdown internos.
4. Abre el Administrador de archivos (o FTP) en `public_html`.
5. Borra el sitio anterior que esté en esa carpeta. No borres otras carpetas del dominio que no sean este sitio, ni `/.well-known/` si el certificado la usa.
6. Sube **el contenido** de `out/` (los archivos de dentro, no la carpeta `out` como nivel extra) a `public_html`.
7. Confirma que `public_html/.htaccess` e `index.html` quedaron en la raíz del dominio.
8. Abre `https://creativehutcr.com/` y una página de servicio. El formulario debe abrir el correo del visitante, no llamar a `/api/send-email`.

Alternativa con GitHub Actions: al fusionar en `main`, el workflow "Export estático" genera el artefacto `creativehut-out`. Descárgalo y súbelo igual, el contenido dentro de `public_html`. El workflow no tiene credenciales de FTP.

## Fase Vercel con Node

Cuando el sitio deje el hosting estático:

1. Volver a crear `src/app/api/send-email/route.ts` que llame a `handleContactEmailPost` (el comentario del módulo indica el archivo). Quitar `output: 'export'` si las páginas deben ejecutarse en el servidor.
2. En el proyecto de Vercel, cargar `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM` y `SMTP_TO` como variables de Production. El formulario del navegador tiene que volver a hacer `POST /api/send-email` en lugar de `mailto`.
3. Apuntar el dominio `creativehutcr.com` al proyecto de Vercel y cambiar los DNS en el registrador a los que indique Vercel. El `.htaccess` de Apache deja de aplicar; las cabeceras pasan a `next.config` o a la configuración del proyecto.
4. `NEXT_PUBLIC_YOUTUBE_API_KEY`, si se usa, sigue siendo pública en el navegador. No pongas la contraseña SMTP en una variable `NEXT_PUBLIC_`.

## 📞 Contacto

- **Email**: web@creativehutcr.com
- **WhatsApp**: +506 7281 1381
- **Website**: https://creativehutcr.com

## 📄 Licencia

Proyecto privado © 2025 Creative Hut Costa Rica

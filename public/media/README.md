# 📸 Media Assets - Creative Hut

Esta carpeta contiene todo el contenido multimedia de Creative Hut: fotografías, videos y recursos audiovisuales para el sitio web, blog y redes sociales.

## 📁 Estructura de Carpetas

### 👥 `/team/`
Contenido del equipo de Creative Hut
- **`/photos/`**: Fotos del equipo, retratos profesionales, fotos grupales
- **`/videos/`**: Videos del equipo trabajando, testimonios, presentaciones

### 💼 `/portfolio/`
Trabajos y proyectos realizados
- **`/photos/`**: Fotografías de proyectos completados, antes/después
- **`/videos/`**: Videos de proyectos, time-lapses, demostraciones

### 🏢 `/office/`
Espacios de trabajo y oficina
- **`/photos/`**: Fotos de la oficina, espacios de trabajo, ambiente laboral

### 🎉 `/events/`
Eventos y actividades de la empresa
- **`/photos/`**: Fotos de eventos corporativos, talleres, conferencias
- **`/videos/`**: Videos de eventos, highlights, coberturas

### 🌄 `/backgrounds/`
Imágenes para fondos y hero sections
- Paisajes de Costa Rica
- Texturas y patrones
- Imágenes abstractas para fondos

### 📝 `/blog/`
Contenido para artículos del blog
- Imágenes de apoyo para posts
- Infografías
- Capturas de pantalla

## 🎯 Formatos Recomendados

### 📸 **Fotografías**
- **Web**: JPG (optimizado, 80-85% calidad)
- **Retina**: JPG @2x para pantallas de alta resolución
- **Tamaños sugeridos**:
  - Hero images: 1920x1080px
  - Portfolio: 800x600px
  - Team photos: 400x400px (cuadradas)
  - Thumbnails: 300x200px

### 🎬 **Videos**
- **Formato**: MP4 (H.264)
- **Hero videos**: 1920x1080, máximo 10MB
- **Testimonials**: 720p, máximo 5MB
- **Social media**: 1080x1080 (cuadrado), 1080x1920 (vertical)

## 🔧 Uso en el Código

```tsx
// Ejemplo de uso en componentes
import Image from 'next/image';

// Foto del equipo
<Image 
  src="/media/team/photos/team-meeting.jpg" 
  alt="Equipo Creative Hut en reunión"
  width={800}
  height={600}
/>

// Video de portfolio
<video controls>
  <source src="/media/portfolio/videos/proyecto-web.mp4" type="video/mp4" />
</video>

// Background image
<div 
  className="hero-bg" 
  style={{backgroundImage: 'url(/media/backgrounds/costa-rica-landscape.jpg)'}}
>
```

## 📋 Convenciones de Nombres

### 📸 **Fotografías**
- `team-meeting-2025-08.jpg`
- `portfolio-website-ecommerce.jpg`
- `office-workspace-main.jpg`
- `event-workshop-digital-marketing.jpg`

### 🎬 **Videos**
- `team-intro-video.mp4`
- `portfolio-app-demo.mp4`
- `event-highlights-2025.mp4`

### 🎨 **Optimización**
- **Compresión**: Usar herramientas como TinyPNG, ImageOptim
- **Formatos modernos**: WebP para navegadores compatibles
- **Lazy loading**: Implementar carga diferida para mejor performance

## 📐 **Dimensiones Estándar**

| Uso | Dimensiones | Formato | Peso Max |
|-----|-------------|---------|----------|
| Hero Banner | 1920x1080 | JPG/WebP | 500KB |
| Portfolio Grid | 800x600 | JPG/WebP | 200KB |
| Team Cards | 400x400 | JPG/WebP | 100KB |
| Blog Thumbnails | 600x400 | JPG/WebP | 150KB |
| Backgrounds | 1920x1080+ | JPG/WebP | 800KB |

## 🚀 **Performance Tips**

1. **Optimizar siempre** antes de subir
2. **Usar Next.js Image** para optimización automática
3. **Implementar lazy loading** para videos
4. **Crear versiones responsive** (múltiples tamaños)
5. **Considerar formatos modernos** (WebP, AVIF)

---
*Última actualización: 1 de agosto de 2025*
*Estructura creada para Creative Hut - Agencia de Marketing Digital*

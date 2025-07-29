# CreativeHut - Brand Color Palette

## Introducción
Este documento contiene todos los colores utilizados en el sitio web de CreativeHut, organizados por categorías de uso y ubicación en el código. Este inventario es esencial para mantener la consistencia visual de la marca.

## 1. Colores Primarios de la Marca

### Azules Principales
- **#3b82f6** - Blue-500 (Azul primario)
- **#1e40af** - Blue-700 (Azul oscuro)
- **#2563eb** - Blue-600 (Azul medio)
- **#60a5fa** - Blue-400 (Azul claro)
- **#93c5fd** - Blue-300 (Azul muy claro)

### Púrpuras Principales
- **#8b5cf6** - Purple-500 (Púrpura primario)
- **#7c3aed** - Purple-600 (Púrpura oscuro)
- **#a855f7** - Purple-500 (Púrpura medio)
- **#c084fc** - Purple-400 (Púrpura claro)

### Violetas
- **#8b5cf6** - Violet-500
- **#7c3aed** - Violet-600
- **#a855f7** - Violet-400

### Rosas y Magentas
- **#ec4899** - Pink-500
- **#db2777** - Pink-600
- **#f472b6** - Pink-400
- **#f9a8d4** - Pink-300

## 2. Colores Secundarios

### Verdes
- **#10b981** - Emerald-500
- **#059669** - Emerald-600
- **#34d399** - Emerald-400
- **#14b8a6** - Teal-500
- **#0d9488** - Teal-600
- **#2dd4bf** - Teal-400
- **#22c55e** - Green-500
- **#16a34a** - Green-600
- **#28a745** - Green success

### Naranjas
- **#ea580c** - Orange-600
- **#fb923c** - Orange-400

### Cianos
- **#06b6d4** - Cyan-500
- **#0891b2** - Cyan-600

## 3. Gradientes Principales

### Gradientes de Navegación
```css
/* Logo gradiente */
from-blue-400 via-purple-500 to-pink-500

/* Hover logo */
hover:from-purple-400 hover:to-blue-400

/* Enlaces de navegación */
hover:from-blue-400 hover:to-purple-500
```

### Gradientes de Hero Section
```css
/* Botón principal */
from-blue-600 via-purple-600 to-pink-600

/* Fondo hero */
from-gray-900 via-gray-800 to-black

/* Overlay hero */
from-violet-600/10 via-purple-600/15 to-blue-600/10
```

### Gradientes de ContactForm
```css
/* Fondo */
from-gray-900 to-black

/* Línea decorativa */
from-blue-500 to-purple-500

/* Iconos de contacto */
from-blue-500 to-purple-600
from-purple-500 to-pink-600
from-pink-500 to-orange-600

/* Botones CTA */
from-blue-600 via-purple-600 to-pink-600
from-green-600 via-emerald-600 to-teal-600
```

## 4. Colores de Estado

### Éxito
- **#22c55e** - Green-500
- **#16a34a** - Green-600
- **#28a745** - Success green

### Error
- **#ef4444** - Red-500
- **#dc2626** - Red-600

### Advertencia
- **#f59e0b** - Amber-500
- **#d97706** - Amber-600

## 5. Colores de Texto

### Grises de Texto
- **#ffffff** - Blanco (texto principal)
- **#f9fafb** - Gray-50 (texto muy claro)
- **#d1d5db** - Gray-300 (texto secundario)
- **#9ca3af** - Gray-400 (texto placeholder)
- **#6b7280** - Gray-500 (texto deshabilitado)
- **#374151** - Gray-700 (texto oscuro)
- **#1f2937** - Gray-800 (texto muy oscuro)
- **#111827** - Gray-900 (texto negro)

### Textos Específicos
- **#333333** - Texto base oscuro
- **#555555** - Texto secundario
- **#666666** - Texto terciario

## 6. Colores de Fondo

### Fondos Principales
- **#171717** - Negro principal
- **#0a0a0a** - Negro muy oscuro (dark mode)
- **#ffffff** - Blanco (light mode)
- **#f9fafb** - Gris muy claro

### Fondos de Tarjetas
- **#1f2937** - Gray-800
- **#374151** - Gray-700
- **#4b5563** - Gray-600

## 7. Colores con Transparencia (RGBA)

### Efectos de Sombra
- **rgba(0, 0, 0, 0.1)** - Sombra suave
- **rgba(0, 0, 0, 0.25)** - Sombra media
- **rgba(0, 0, 0, 0.4)** - Sombra fuerte

### Efectos de Luz
- **rgba(59, 130, 246, 0.5)** - Glow azul
- **rgba(139, 92, 246, 0.6)** - Glow púrpura
- **rgba(236, 72, 153, 0.5)** - Glow rosa

### Fondos con Transparencia
- **rgba(255, 255, 255, 0.85)** - Fondo glassmorphism
- **rgba(255, 255, 255, 0.2)** - Overlay sutil
- **rgba(155, 155, 155, 0.5)** - Scrollbar

## 8. Variables CSS Personalizadas

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

## 9. Colores en Email Templates

### Templates de Email
- **#f9f9f9** - Fondo de email
- **#667eea** - Azul email
- **#764ba2** - Púrpura email
- **#28a745** - Verde éxito email

## 10. Colores SVG y Gráficos

### SVG Decorativos
- **#ffd700** - Dorado
- **#87ceeb** - Azul cielo
- **#6c63ff** - Índigo

## 11. Recomendaciones de Uso

### Combinaciones Principales
1. **Azul + Púrpura**: Para elementos interactivos y CTAs
2. **Púrpura + Rosa**: Para elementos destacados y hover states
3. **Verde + Teal**: Para indicadores de éxito y confirmaciones
4. **Gris + Azul**: Para texto sobre fondos oscuros

### Jerarquía de Colores
1. **Primario**: Azul (#3b82f6)
2. **Secundario**: Púrpura (#8b5cf6)
3. **Acento**: Rosa (#ec4899)
4. **Éxito**: Verde (#22c55e)
5. **Neutro**: Gris (#6b7280)

## 12. Accesibilidad

### Contraste Mínimo
- Texto sobre fondo oscuro: Usar blancos y grises claros
- Texto sobre fondo claro: Usar grises oscuros y negros
- Elementos interactivos: Mantener contraste 4.5:1 mínimo

### Estados de Focus
- Usar anillos de color púrpura (#8b5cf6) para elementos enfocados
- Mantener visibilidad en modo de alto contraste

---

**Última actualización**: $(date)
**Generado desde**: CreativeHut Website Codebase
**Mantenido por**: José Ríler Solórzano Campos
**Contacto**: hola@creativehutcr.com

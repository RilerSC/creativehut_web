# 🎨 Brand Assets - Creative Hut

Los archivos siguen en `public/brand/`. Esta nota está fuera de `public/` para que el export estático no la copie a `out/`.

Esta carpeta contiene todos los recursos visuales de la marca Creative Hut.

## 📁 Estructura de Carpetas

### `/logos`
- Logotipos principales de Creative Hut
- Variaciones del logo (horizontal, vertical, isotipo)
- Versiones en diferentes colores (blanco, negro, color)
- Formatos recomendados: SVG para web

### `/icons`
- Iconos específicos de la marca
- Iconos de servicios personalizados
- Elementos gráficos pequeños
- Formatos recomendados: SVG

### `/illustrations`
- Ilustraciones personalizadas
- Elementos decorativos
- Gráficos complejos de la marca
- Formatos recomendados: SVG, PNG

## 🔧 Uso en el Código

Para usar estos assets en el proyecto:

```tsx
// Ejemplo de uso de logo
import Image from 'next/image';

<Image 
  src="/brand/logos/creativehut-logo.svg" 
  alt="Creative Hut Logo"
  width={200}
  height={50}
/>

// Para SVGs como componentes
<img src="/brand/icons/service-icon.svg" alt="Servicio" />
```

## 📋 Convenciones de Nombres

- Usar kebab-case: `creativehut-logo-horizontal.svg`
- Incluir variación en el nombre: `logo-white.svg`, `logo-color.svg`
- Ser descriptivo: `marketing-service-icon.svg`

## 🎯 Formatos Recomendados

- **SVG**: Para logos, iconos y elementos escalables
- **PNG**: Solo para ilustraciones complejas si es necesario
- **Optimización**: Todos los SVG deben estar optimizados

---
*Última actualización: 1 de agosto de 2025*

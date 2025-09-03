# 🔴 Creative Hut Live - Página de Transmisiones

Este es un sistema completo para transmisiones en vivo privadas de YouTube integrado en tu sitio web. Permite mostrar webinars, eventos, sorteos y workshops exclusivos para tu comunidad.

## 🚀 Características

- ✅ **Transmisiones privadas de YouTube** - Solo visibles desde tu web
- ✅ **Chat en vivo simulado** - Interacción con la audiencia
- ✅ **Gestión fácil de eventos** - Configuración simple
- ✅ **Diseño responsivo** - Se adapta a todos los dispositivos
- ✅ **Contador de viewers** - Muestra la popularidad del evento
- ✅ **Próximos eventos** - Calendario de transmisiones futuras

## 📁 Estructura de Archivos

```
src/
├── app/live/
│   └── page.tsx                 # Página principal de transmisiones
└── lib/
    └── livestream-config.ts     # Configuración de transmisiones
```

## 🔧 Cómo Usar

### 1. Configurar una Transmisión Activa

Edita el archivo `src/lib/livestream-config.ts`:

```typescript
export const LIVE_STREAM_CONFIG = {
  isLive: true,                    // 🔴 Cambiar a true para activar
  videoId: 'TU_VIDEO_ID_AQUI',     // 📺 ID del video privado de YouTube
  eventTitle: 'Tu Evento Aquí',
  eventDescription: 'Descripción del evento...',
  // ... resto de configuración
};
```

### 2. Obtener el ID de Video de YouTube

1. Ve a YouTube Studio
2. Crea una transmisión privada/no listada
3. Copia el ID del video de la URL (ejemplo: si la URL es `https://youtube.com/watch?v=ABC123XYZ`, el ID es `ABC123XYZ`)

### 3. Programar Eventos Futuros

Agrega eventos al array `UPCOMING_EVENTS`:

```typescript
{
  id: '4',
  title: 'Mi Nuevo Evento',
  description: 'Descripción...',
  date: '2025-10-15',
  time: '19:00',
  category: 'webinar', // webinar, evento, sorteo, workshop
  icon: '🎓'
}
```

### 4. Desactivar Transmisión

Cuando termine el evento:

```typescript
export const LIVE_STREAM_CONFIG = {
  isLive: false,    // 🔴 Cambiar a false
  videoId: '',      // 📺 Limpiar el ID
  // ... resto se mantiene igual
};
```

## 🎨 Personalización

### Colores por Categoría

Los colores se configuran automáticamente según la categoría:

- **Webinar**: Azul 🔵
- **Evento**: Púrpura 🟣  
- **Sorteo**: Rosa 🩷
- **Workshop**: Verde 🟢

### Chat Personalizado

Puedes modificar los mensajes predeterminados en `DEFAULT_CHAT_MESSAGES`:

```typescript
export const DEFAULT_CHAT_MESSAGES = [
  { user: 'Admin', message: '¡Bienvenidos!', time: '19:00' },
  // ... más mensajes
];
```

## 📱 Acceso a la Página

La página estará disponible en:
- **Local**: `http://localhost:3000/live`
- **Producción**: `https://tudominio.com/live`

## 🔒 Privacidad y Seguridad

- **Videos privados**: Solo accesibles desde tu sitio web
- **Control total**: Tú decides cuándo activar/desactivar transmisiones
- **Sin rastro en YouTube**: Los usuarios no pueden encontrar el video directamente

## 🎯 Estrategia de Tráfico

Esta implementación cumple tu objetivo de:

1. **Forzar visitas a tu web** - Los usuarios deben ir a tu sitio para ver el contenido
2. **Aumentar tiempo de permanencia** - Chat y diseño atractivo mantienen a los usuarios
3. **Generar engagement** - Interacción en tiempo real con tu audiencia
4. **Exclusividad** - Solo tu comunidad tiene acceso

## 🛠️ Próximas Mejoras Posibles

- [ ] Integración con YouTube API para datos reales de viewers
- [ ] Sistema de registro para eventos
- [ ] Notificaciones push para eventos
- [ ] Chat real con WebSockets
- [ ] Analytics de participación
- [ ] Sistema de recordatorios por email

## 📞 Soporte

Si necesitas ayuda con la configuración o personalizaciones adicionales, contacta al desarrollador.

---

**© 2025 Creative Hut - Sistema de Transmisiones en Vivo**

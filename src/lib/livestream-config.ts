/**
 * ===============================================
 * CREATIVE HUT WEBSITE - CONFIGURACIÓN DE TRANSMISIONES
 * ===============================================
 * 
 * Archivo de configuración para las transmisiones en vivo
 * de YouTube. Permite gestionar fácilmente las transmisiones
 * activas y próximos eventos.
 * 
 * INSTRUCCIONES DE USO:
 * 
 * 1. Para activar una transmisión:
 *    - Cambia `isLive` a `true`
 *    - Añade el `videoId` del video privado de YouTube
 *    - Actualiza `eventTitle` y `eventDescription`
 * 
 * 2. Para desactivar transmisión:
 *    - Cambia `isLive` a `false`
 *    - Limpia el `videoId` (déjalo como string vacío)
 * 
 * 3. Para programar eventos:
 *    - Añade nuevos eventos al array `UPCOMING_EVENTS`
 * 
 * ===============================================
 */

// Configuración de la transmisión activa
export const LIVE_STREAM_CONFIG = {
  // ⚡ CONTROLES PRINCIPALES
  isLive: true, // 🔴 CAMBIAR A TRUE CUANDO HAYA TRANSMISIÓN ACTIVA
  videoId: 'pr1oWsFf26A', // 📺 ID DEL VIDEO PRIVADO DE YOUTUBE (ejemplo de prueba)
  
  // � API CONFIGURATION (Para datos reales de YouTube)
  // NOTA: Para producción, mover a variables de entorno
  youtubeApiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '', // API Key de YouTube Data API v3
  enableRealTimeData: true, // Habilitar datos en tiempo real
  
  // �📝 INFORMACIÓN DEL EVENTO
  eventTitle: 'Webinar Exclusivo: Estrategias Digitales 2025',
  eventDescription: 'Únete a nuestro webinar exclusivo donde compartimos las últimas tendencias en marketing digital y desarrollo web para el 2025.',
  eventDate: '2025-09-15',
  eventTime: '19:00',
  timezone: 'GMT-6 (CST)',
  category: 'webinar', // webinar, evento, sorteo, workshop
  
  // 🎯 CONFIGURACIONES DE REPRODUCTOR OPTIMIZADAS
  autoplay: true, // Reproducir automáticamente cuando se carga
  muted: false, // Audio habilitado
  showControls: false, // OCULTAR TODOS LOS CONTROLES DE YOUTUBE
  enableJSAPI: true, // Habilitar API de JavaScript
  modestBranding: true, // Ocultar logo de YouTube
  showRelated: false, // No mostrar videos relacionados
  showInfo: false, // Ocultar información del video (título, etc.)
  showAnnotations: false, // Ocultar anotaciones
  disableKeyboard: true, // DESHABILITAR CONTROLES DE TECLADO
  fullscreen: true, // Permitir pantalla completa
  playsinline: true, // Reproducir inline en móviles (iOS)
  origin: typeof window !== 'undefined' ? window.location.origin : 'https://creativehut.com', // Configurar origen para seguridad
};

// 📅 Próximos eventos programados
export const UPCOMING_EVENTS = [
  {
    id: '1',
    title: 'Workshop: Tendencias UI/UX 2025',
    description: 'Descubre las nuevas tendencias en diseño de interfaces y experiencia de usuario que marcarán el 2025.',
    date: '2025-09-22',
    time: '20:00',
    category: 'workshop',
    icon: '🛠️',
    isRegistrationOpen: true,
    estimatedDuration: '2 horas',
    maxParticipants: 100
  },
  {
    id: '2',
    title: 'Sorteo: MacBook Pro M3',
    description: 'Participa en nuestro sorteo exclusivo y gana una MacBook Pro M3. Solo para miembros de nuestra comunidad.',
    date: '2025-09-29',
    time: '19:00',
    category: 'sorteo',
    icon: '🎁',
    isRegistrationOpen: true,
    estimatedDuration: '1 hora',
    prize: 'MacBook Pro M3 14"'
  },
  {
    id: '3',
    title: 'Evento: Lanzamiento Creative Suite 2025',
    description: 'Presentación oficial de nuestra nueva suite de herramientas creativas y servicios premium.',
    date: '2025-10-05',
    time: '18:30',
    category: 'evento',
    icon: '🎉',
    isRegistrationOpen: false,
    estimatedDuration: '1.5 horas',
    isSpecial: true
  },
  {
    id: '4',
    title: 'Masterclass: Branding para Startups',
    description: 'Aprende a construir una identidad de marca sólida desde cero para tu startup.',
    date: '2025-10-12',
    time: '19:30',
    category: 'webinar',
    icon: '🎓',
    isRegistrationOpen: true,
    estimatedDuration: '2.5 horas',
    instructor: 'José Ríler Solórzano'
  }
];

// 🎨 Configuración de colores por categoría
export const CATEGORY_STYLES = {
  webinar: {
    gradient: 'from-blue-500 to-blue-700',
    color: 'bg-blue-500',
    textColor: 'text-blue-400',
    icon: '🎓'
  },
  evento: {
    gradient: 'from-purple-500 to-purple-700',
    color: 'bg-purple-500',
    textColor: 'text-purple-400',
    icon: '🎉'
  },
  sorteo: {
    gradient: 'from-pink-500 to-pink-700',
    color: 'bg-pink-500',
    textColor: 'text-pink-400',
    icon: '🎁'
  },
  workshop: {
    gradient: 'from-green-500 to-green-700',
    color: 'bg-green-500',
    textColor: 'text-green-400',
    icon: '🛠️'
  }
};

// 🔧 Funciones de utilidad
export const getCategoryStyle = (category: string) => {
  return CATEGORY_STYLES[category as keyof typeof CATEGORY_STYLES] || CATEGORY_STYLES.webinar;
};

export const generateEmbedUrl = (videoId: string) => {
  const config = LIVE_STREAM_CONFIG;
  const params = new URLSearchParams({
    // Reproducción y controles
    autoplay: config.autoplay ? '1' : '0',
    mute: config.muted ? '1' : '0',
    controls: config.showControls ? '1' : '0',
    disablekb: config.disableKeyboard ? '1' : '0',
    fs: config.fullscreen ? '1' : '0',
    playsinline: config.playsinline ? '1' : '0',
    
    // Branding y información
    modestbranding: config.modestBranding ? '1' : '0',
    showinfo: config.showInfo ? '1' : '0',
    rel: config.showRelated ? '1' : '0',
    iv_load_policy: config.showAnnotations ? '1' : '3', // 3 = no mostrar anotaciones
    
    // API y seguridad
    enablejsapi: config.enableJSAPI ? '1' : '0',
    origin: config.origin,
    
    // Optimizaciones adicionales
    cc_load_policy: '0', // No mostrar subtítulos por defecto
    hl: 'es', // Idioma español
    color: 'white', // Color de la barra de progreso
    theme: 'dark', // Tema oscuro
    wmode: 'opaque', // Modo de ventana para mejor rendimiento
    autohide: '1', // Ocultar controles automáticamente
    
    // Parámetros adicionales para ocultar TODO
    branding: '0', // Sin branding
    loop: '0', // Sin loop
    playlist: '', // Sin playlist
    
    // Prevenir saltos a YouTube
    widget_referrer: config.origin
  });
  
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

export const formatEventDate = (date: string, time: string) => {
  return new Date(`${date}T${time}`).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 💬 Mensajes predeterminados para el chat (simulado)
export const DEFAULT_CHAT_MESSAGES = [
  { user: 'María_Design', message: '¡Hola a todos! 👋', time: '19:01' },
  { user: 'DevCarlos', message: 'Esperando con ansias este webinar', time: '19:02' },
  { user: 'Ana_Marketing', message: '¿Habrá certificado al final?', time: '19:03' },
  { user: 'Creative_Hut', message: '¡Bienvenidos! Comenzamos en 2 minutos', time: '19:04' },
  { user: 'Luis_Frontend', message: 'Excelente calidad de audio 🎵', time: '19:05' },
];

// 🔔 Configuración de notificaciones
export const NOTIFICATION_CONFIG = {
  enableBrowserNotifications: true,
  notifyBeforeStart: 10, // minutos antes del evento
  enableEmailReminders: true,
  enableWhatsAppReminders: false,
};

// 📊 Configuración de analytics
export const ANALYTICS_CONFIG = {
  trackViewerCount: true,
  trackChatMessages: true,
  trackEventInteractions: true,
  trackRegistrations: true,
};

// 🔴 FUNCIONES PARA DATOS EN TIEMPO REAL DE YOUTUBE

// Interfaz para datos de transmisión en vivo
export interface LiveStreamData {
  viewerCount: number;
  isLive: boolean;
  title: string;
  description: string;
  startTime: string;
}

// Interfaz para mensajes de chat en vivo
export interface LiveChatMessage {
  id: string;
  author: string;
  message: string;
  timestamp: string;
  authorChannelId?: string;
}

// Interfaz para el item de la API de YouTube
interface YouTubeChatItem {
  id: string;
  snippet: {
    displayMessage: string;
    publishedAt: string;
  };
  authorDetails: {
    displayName: string;
    channelId: string;
  };
}

// Función para obtener datos de la transmisión en tiempo real
export const fetchLiveStreamData = async (videoId: string): Promise<LiveStreamData | null> => {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const enableRealTime = process.env.NEXT_PUBLIC_ENABLE_REAL_TIME_DATA === 'true';
  
  console.log('🔑 API Key disponible:', !!apiKey);
  console.log('🔑 API Key (primeros 10 chars):', apiKey?.substring(0, 10));
  console.log('⚙️ Datos en tiempo real habilitados:', enableRealTime);
  console.log('📺 Video ID:', videoId);
  
  if (!apiKey || !enableRealTime) {
    console.log('❌ API Key no configurada o datos en tiempo real deshabilitados');
    return null;
  }

  if (!videoId) {
    console.log('❌ Video ID no proporcionado');
    return null;
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails,statistics&id=${videoId}&key=${apiKey}`;
    console.log('🌐 Haciendo petición a:', url.replace(apiKey, 'API_KEY_OCULTA'));
    
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error en respuesta de YouTube API:', response.status, errorText);
      throw new Error(`YouTube API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('📊 Respuesta completa de YouTube API:', data);
    
    if (data.items && data.items.length > 0) {
      const video = data.items[0];
      const liveDetails = video.liveStreamingDetails;
      const statistics = video.statistics;

      const result = {
        viewerCount: parseInt(liveDetails?.concurrentViewers || statistics?.viewCount || '0'),
        isLive: !!(liveDetails?.actualStartTime && !liveDetails?.actualEndTime),
        title: video.snippet.title,
        description: video.snippet.description,
        startTime: liveDetails?.actualStartTime || liveDetails?.scheduledStartTime || ''
      };
      
      console.log('✅ Datos procesados:', result);
      return result;
    } else {
      console.log('❌ No se encontraron datos para el video:', videoId);
      return null;
    }
  } catch (error) {
    console.error('❌ Error al obtener datos de YouTube:', error);
    throw error;
  }
};

// Función para obtener mensajes del chat en vivo
export const fetchLiveChatMessages = async (videoId: string, nextPageToken?: string): Promise<{
  messages: LiveChatMessage[];
  nextPageToken?: string;
  pollingIntervalMillis?: number;
} | null> => {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const enableRealTime = process.env.NEXT_PUBLIC_ENABLE_REAL_TIME_DATA === 'true';
  
  if (!apiKey || !enableRealTime || !videoId) {
    return null;
  }

  try {
    // Primero obtener el liveChatId del video
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${videoId}&key=${apiKey}`
    );

    if (!videoResponse.ok) {
      throw new Error(`YouTube API error: ${videoResponse.status}`);
    }

    const videoData = await videoResponse.json();
    const liveChatId = videoData.items?.[0]?.liveStreamingDetails?.activeLiveChatId;

    if (!liveChatId) {
      console.log('💬 No hay chat activo disponible (normal para videos privados)');
      return null;
    }

    // Obtener mensajes del chat
    let url = `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}&part=snippet,authorDetails&key=${apiKey}`;
    
    if (nextPageToken) {
      url += `&pageToken=${nextPageToken}`;
    }

    const chatResponse = await fetch(url);

    if (!chatResponse.ok) {
      throw new Error(`YouTube Chat API error: ${chatResponse.status}`);
    }

    const chatData = await chatResponse.json();

    const messages: LiveChatMessage[] = chatData.items?.map((item: YouTubeChatItem) => ({
      id: item.id,
      author: item.authorDetails.displayName,
      message: item.snippet.displayMessage,
      timestamp: item.snippet.publishedAt,
      authorChannelId: item.authorDetails.channelId
    })) || [];

    return {
      messages,
      nextPageToken: chatData.nextPageToken,
      pollingIntervalMillis: chatData.pollingIntervalMillis
    };

  } catch (error) {
    console.log('💬 Error obteniendo chat (esperado para videos privados):', error);
  }

  return null;
};

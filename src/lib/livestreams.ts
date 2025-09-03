/**
 * ===============================================
 * CREATIVE HUT WEBSITE - PROPIEDAD INTELECTUAL
 * ===============================================
 * 
 * Desarrollado por: Ing. José Ríler Solórzano Campos
 * Empresa: DEVIT506
 * Website: www.devit506.net
 * Fecha: 31 de agosto de 2025
 * 
 * © 2025 José Ríler Solórzano Campos - DEVIT506
 * Todos los derechos reservados.
 * 
 * Este código es propiedad intelectual exclusiva del 
 * desarrollador y no puede ser reproducido, distribuido
 * o modificado sin autorización expresa por escrito.
 * ===============================================
 */

export interface LiveStream {
  id: string;
  title: string;
  description: string;
  videoId: string; // ID del video privado de YouTube
  scheduledFor: Date;
  isLive: boolean;
  category: 'webinar' | 'evento' | 'sorteo' | 'workshop' | 'tutorial' | 'conferencia';
  thumbnail?: string;
  duration?: number; // Duración estimada en minutos
  tags?: string[];
  instructor?: string;
  maxViewers?: number;
}

// Configuración de transmisiones
// IMPORTANTE: Para usar transmisiones privadas de YouTube:
// 1. Crear el evento/transmisión en YouTube Studio
// 2. Configurar como "No listado" o "Privado"
// 3. Obtener el ID del video
// 4. Agregar el dominio a la lista blanca en YouTube (si es necesario)

export const liveStreams: LiveStream[] = [
  {
    id: 'webinar-marketing-2025',
    title: 'Webinar: Marketing Digital 2025 - Tendencias y Estrategias Revolucionarias',
    description: 'Descubre las últimas tendencias en marketing digital que dominarán el 2025. Aprende estrategias probadas para maximizar el ROI, técnicas de IA aplicadas al marketing, y cómo crear campañas que realmente conviertan. Incluye sesión de Q&A exclusiva.',
    videoId: '', // Configurar cuando esté programado
    scheduledFor: new Date('2025-09-15T19:00:00-06:00'), // Hora de Costa Rica
    isLive: false,
    category: 'webinar',
    duration: 90,
    instructor: 'Equipo Creative Hut',
    maxViewers: 500,
    tags: ['marketing digital', 'tendencias 2025', 'ROI', 'conversiones', 'IA marketing']
  },
  {
    id: 'evento-identidad-visual',
    title: 'Evento Live: Lanzamiento Nueva Metodología de Identidad Visual',
    description: 'Acompáñanos en el lanzamiento exclusivo de nuestra nueva metodología para crear identidades visuales que realmente impactan. Verás casos reales, antes y después, y podrás hacer preguntas en tiempo real a nuestros diseñadores.',
    videoId: '', 
    scheduledFor: new Date('2025-09-20T20:00:00-06:00'),
    isLive: false,
    category: 'evento',
    duration: 60,
    instructor: 'Equipo de Diseño Creative Hut',
    maxViewers: 300,
    tags: ['identidad visual', 'branding', 'diseño', 'metodología', 'casos reales']
  },
  {
    id: 'sorteo-paquete-premium',
    title: 'Gran Sorteo Live: Paquete Premium de Servicios Creative Hut',
    description: 'Participa en nuestro sorteo más grande del año. En vivo sortearemos un paquete completo de servicios valorado en $5,000 que incluye: identidad visual completa, sitio web profesional, y campaña de marketing digital. ¡No te lo pierdas!',
    videoId: '',
    scheduledFor: new Date('2025-10-01T19:30:00-06:00'),
    isLive: false,
    category: 'sorteo',
    duration: 45,
    instructor: 'Equipo Complete Creative Hut',
    maxViewers: 1000,
    tags: ['sorteo', 'premios', 'paquete premium', 'servicios gratis', 'comunidad']
  },
  {
    id: 'workshop-figma-avanzado',
    title: 'Workshop: Figma Avanzado - Técnicas Profesionales de Diseño UI/UX',
    description: 'Workshop intensivo donde aprenderás técnicas avanzadas de Figma que usan los profesionales. Componentes avanzados, auto-layout profesional, sistemas de diseño escalables, y trucos que acelerar tu flujo de trabajo. Incluye archivos descargables.',
    videoId: '',
    scheduledFor: new Date('2025-10-10T18:00:00-06:00'),
    isLive: false,
    category: 'workshop',
    duration: 120,
    instructor: 'Senior UI/UX Designer',
    maxViewers: 200,
    tags: ['figma', 'UI/UX', 'diseño avanzado', 'componentes', 'sistema de diseño']
  },
  {
    id: 'tutorial-react-nextjs',
    title: 'Tutorial Live: Construyendo una Landing Page con React y Next.js',
    description: 'Sesión en vivo donde construiremos desde cero una landing page profesional usando React, Next.js, y Tailwind CSS. Aprende las mejores prácticas, optimización para SEO, y cómo desplegar tu proyecto. Perfecto para desarrolladores intermedios.',
    videoId: '',
    scheduledFor: new Date('2025-10-15T19:00:00-06:00'),
    isLive: false,
    category: 'tutorial',
    duration: 150,
    instructor: 'Lead Developer Creative Hut',
    maxViewers: 250,
    tags: ['react', 'nextjs', 'tailwind', 'desarrollo web', 'landing page', 'SEO']
  }
];

// Funciones utilitarias para manejar las transmisiones
export const getLiveStream = () => {
  return liveStreams.find(stream => stream.isLive) || null;
};

export const getUpcomingStreams = () => {
  const now = new Date();
  return liveStreams
    .filter(stream => !stream.isLive && stream.scheduledFor > now)
    .sort((a, b) => a.scheduledFor.getTime() - b.scheduledFor.getTime());
};

export const getPastStreams = () => {
  const now = new Date();
  return liveStreams
    .filter(stream => !stream.isLive && stream.scheduledFor < now)
    .sort((a, b) => b.scheduledFor.getTime() - a.scheduledFor.getTime());
};

export const getStreamById = (id: string) => {
  return liveStreams.find(stream => stream.id === id) || null;
};

export const getCategoryColor = (category: LiveStream['category']) => {
  const colors = {
    webinar: 'bg-blue-500',
    evento: 'bg-purple-500',
    sorteo: 'bg-pink-500',
    workshop: 'bg-green-500',
    tutorial: 'bg-orange-500',
    conferencia: 'bg-indigo-500'
  };
  return colors[category] || 'bg-gray-500';
};

export const getCategoryIcon = (category: LiveStream['category']) => {
  const icons = {
    webinar: '🎓',
    evento: '🎉',
    sorteo: '🎁',
    workshop: '🛠️',
    tutorial: '📚',
    conferencia: '🎤'
  };
  return icons[category] || '📺';
};

export const formatStreamDate = (date: Date) => {
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
};

// Configuración para YouTube API (si se necesita en el futuro)
export const YOUTUBE_CONFIG = {
  // API Key se configuraría en variables de entorno
  API_KEY: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '',
  CHANNEL_ID: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || '',
  // Configuración de embed
  EMBED_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || 'localhost:3000',
  // Configuración de seguridad para transmisiones privadas
  ALLOWED_DOMAINS: [
    'creativehut.com',
    'www.creativehut.com',
    'localhost:3000',
    'localhost:3001',
    'localhost:3002'
  ]
};

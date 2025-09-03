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

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  LIVE_STREAM_CONFIG, 
  UPCOMING_EVENTS, 
  getCategoryStyle, 
  generateEmbedUrl,
  formatEventDate,
  DEFAULT_CHAT_MESSAGES
} from '@/lib/livestream-config';
import { useLiveStreamData } from '@/hooks/useLiveStreamData';

// Definir tipos para YouTube API
declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, config: {
        events?: {
          onReady?: (event: { target: YTPlayer }) => void;
          onStateChange?: (event: { target: YTPlayer; data: number }) => void;
        };
      }) => YTPlayer;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
      ready: (callback: () => void) => void;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayer {
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getVolume: () => number;
  setVolume: (volume: number) => void;
}

export default function LivePage() {
  // Datos simulados como fallback
  const [viewerCount, setViewerCount] = useState(42);
  const [chatMessages, setChatMessages] = useState(DEFAULT_CHAT_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false); // CAMBIAR A FALSE PARA PERMITIR AUDIO
  const [player, setPlayer] = useState<YTPlayer | null>(null);

  // Datos reales de YouTube (si está disponible la API key)
  const { 
    data: liveData, 
    chatMessages: realChatMessages, 
    loading: liveDataLoading,
    error: liveDataError
  } = useLiveStreamData(LIVE_STREAM_CONFIG.videoId || '', 60000); // CAMBIAR A 60 SEGUNDOS

  // Debug: mostrar información en consola
  useEffect(() => {
    if (liveDataError) {
      console.log('❌ Error de datos en vivo:', liveDataError);
    }
    if (liveData) {
      console.log('✅ Datos de transmisión recibidos:', liveData);
    }
  }, [liveData, liveDataError]);

  // Usar datos reales si están disponibles, de lo contrario usar simulados
  useEffect(() => {
    if (liveData && !liveDataLoading) {
      setViewerCount(liveData.viewerCount);
    } else if (liveDataError?.includes('quotaExceeded')) {
      // Si se agotó la cuota, usar simulación inteligente
      console.log('📊 Cuota de API agotada, usando simulación inteligente');
      // Simular viewers basado en hora del día
      const hour = new Date().getHours();
      const baseViewers = hour >= 19 && hour <= 21 ? 150 : 80; // Más viewers en horario prime
      setViewerCount(baseViewers + Math.floor(Math.random() * 50));
    }
  }, [liveData, liveDataLoading, liveDataError]);

  // Actualizar chat con datos reales si están disponibles
  useEffect(() => {
    if (realChatMessages.length > 0) {
      const formattedMessages = realChatMessages.map(msg => ({
        user: msg.author,
        message: msg.message,
        time: new Date(msg.timestamp).toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      }));
      setChatMessages(prev => [...prev, ...formattedMessages]);
    }
  }, [realChatMessages]);

  useEffect(() => {
    // Solo simular si no hay datos reales o si hay error de cuota
    if ((!liveData && LIVE_STREAM_CONFIG.isLive) || liveDataError?.includes('quotaExceeded')) {
      const interval = setInterval(() => {
        setViewerCount((prev: number) => {
          // Simulación más realista basada en hora
          const hour = new Date().getHours();
          const isWatchingTime = hour >= 19 && hour <= 22;
          const baseChange = isWatchingTime ? 2 : -1;
          const randomChange = Math.floor(Math.random() * 8) - 3; // -3 a +4
          const newCount = prev + baseChange + randomChange;
          return Math.max(50, Math.min(300, newCount)); // Entre 50 y 300 viewers
        });
      }, 20000); // Cada 20 segundos
      return () => clearInterval(interval);
    }

    // Cargar YouTube API si hay transmisión activa
    if (LIVE_STREAM_CONFIG.isLive && LIVE_STREAM_CONFIG.videoId) {
      loadYouTubeAPI();
    }
  }, [liveData, liveDataError]);

  const loadYouTubeAPI = () => {
    // Cargar la API de YouTube para controlar el reproductor
    if (typeof window !== 'undefined') {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
          new window.YT.Player('youtube-player', {
            events: {
              'onReady': (event: { target: YTPlayer }) => {
                setPlayer(event.target);
                // NO MUTEAR AL INICIO - PERMITIR AUDIO
                event.target.setVolume(80); // Volumen al 80%
              }
            }
          });
        };
      }
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const time = new Date().toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      setChatMessages(prev => [...prev, {
        user: 'Tú',
        message: newMessage,
        time
      }]);
      setNewMessage('');
    }
  };

  const toggleMute = () => {
    if (player && player.unMute) {
      if (isMuted) {
        player.unMute();
        player.setVolume(80); // Volumen al 80%
        setIsMuted(false);
      } else {
        player.mute();
        setIsMuted(true);
      }
    } else {
      // Fallback más amigable
      setIsMuted(!isMuted);
      const message = !isMuted 
        ? 'Audio silenciado. Usa los controles del reproductor para reactivar.'
        : 'Audio activado';
      
      // Mostrar notificación temporal en lugar de alert
      const notification = document.createElement('div');
      notification.textContent = message;
      notification.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    }
  };

  const embedUrl = LIVE_STREAM_CONFIG.videoId 
    ? generateEmbedUrl(LIVE_STREAM_CONFIG.videoId)
    : null;

  return (
    <>
  return (
    <>
      {/* CSS personalizado para ocultar controles de YouTube */}
      <style dangerouslySetInnerHTML={{
        __html: `
        #youtube-player {
          pointer-events: auto !important;
        }
        
        /* Ocultar todos los controles de YouTube */
        .ytp-chrome-top,
        .ytp-chrome-bottom,
        .ytp-gradient-top,
        .ytp-gradient-bottom,
        .ytp-progress-bar-container,
        .ytp-chrome-controls,
        .ytp-cards-teaser,
        .ytp-pause-overlay,
        .ytp-player-content,
        .ytp-endscreen-content,
        .ytp-watermark,
        .ytp-context-menu,
        .ytp-title,
        .ytp-title-text,
        .ytp-title-channel,
        .ytp-videowall-still,
        .ytp-gradient-bottom,
        .ytp-show-cards-title {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
        
        /* Asegurar que el iframe sea completamente limpio */
        iframe[src*="youtube.com"]:hover .ytp-chrome-top,
        iframe[src*="youtube.com"]:hover .ytp-chrome-bottom {
          display: none !important;
        }
        `
      }} />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Header Minimalista */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/brand/logos/isotipo-neon_celeste.svg"
                alt="Creative Hut"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Creative Hut Live
              </span>
            </div>
            
            {LIVE_STREAM_CONFIG.isLive && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">EN VIVO</span>
                  <span className="text-gray-300 text-sm">
                    {viewerCount} viewers
                  </span>
                </div>
                
                {/* Indicador de tipo de datos */}
                <div className="flex items-center space-x-1">
                  {liveData && !liveDataLoading ? (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-400 text-xs">Datos reales</span>
                    </>
                  ) : liveDataError?.includes('quotaExceeded') ? (
                    <>
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-orange-400 text-xs">Cuota agotada</span>
                    </>
                  ) : liveDataError ? (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-red-400 text-xs">Error API</span>
                    </>
                  ) : liveDataLoading ? (
                    <>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-400 text-xs">Cargando...</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-yellow-400 text-xs">Simulado</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
              🔴 Creative Hut Live
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Transmisiones exclusivas solo para nuestra comunidad. Webinars, eventos, sorteos y workshops en tiempo real.
            </p>
            
            {/* Status Badge */}
            <div className="inline-flex items-center space-x-2 bg-black/30 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <div className={`w-3 h-3 rounded-full ${LIVE_STREAM_CONFIG.isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
              <span className="text-white font-medium">
                {LIVE_STREAM_CONFIG.isLive ? 'EN VIVO AHORA' : 'SIN TRANSMISIÓN ACTIVA'}
              </span>
            </div>
          </div>

          {LIVE_STREAM_CONFIG.isLive && embedUrl ? (
            /* Transmisión Activa */
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
              
              {/* Video Principal */}
              <div className="lg:col-span-3">
                <div className="bg-black rounded-2xl overflow-hidden shadow-2xl relative">
                  {/* Reproductor YouTube Optimizado */}
                  <iframe
                    id="youtube-player"
                    src={embedUrl || undefined}
                    className="w-full aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title="Creative Hut Live Stream"
                    style={{
                      border: 'none',
                      background: '#000'
                    }}
                    loading="eager"
                  ></iframe>
                  
                  {/* Controles Personalizados Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 backdrop-blur-sm rounded-lg p-3 md:p-4">
                    <div className="flex items-center space-x-3">
                      {/* Indicador EN VIVO */}
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-white text-xs md:text-sm font-medium">EN VIVO</span>
                      </div>
                      
                      {/* Contador de viewers */}
                      <div className="flex items-center space-x-1">
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="text-gray-300 text-xs md:text-sm">{viewerCount}</span>
                      </div>
                    </div>
                    
                    {/* Controles de Audio */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleMute}
                        className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors"
                        title={isMuted ? 'Activar sonido' : 'Silenciar'}
                      >
                        {isMuted ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          </svg>
                        )}
                      </button>
                      
                      {/* Botón de pantalla completa para móviles */}
                      <button
                        onClick={() => {
                          const iframe = document.querySelector('iframe');
                          if (iframe && iframe.requestFullscreen) {
                            iframe.requestFullscreen();
                          }
                        }}
                        className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors md:hidden"
                        title="Pantalla completa"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Mensaje para activar sonido */}
                  {isMuted && (
                    <div className="absolute top-4 left-4 right-4">
                      <div className="bg-blue-500/90 text-white text-xs md:text-sm px-3 py-2 rounded-lg flex items-center space-x-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                        <span>Audio silenciado - Haz clic en el botón de sonido para activarlo</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Información del Evento */}
                <div className="mt-6 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {LIVE_STREAM_CONFIG.eventTitle}
                  </h2>
                  <p className="text-gray-300 mb-4">
                    {LIVE_STREAM_CONFIG.eventDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-300">
                        {new Date(LIVE_STREAM_CONFIG.eventDate).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-300">
                        {LIVE_STREAM_CONFIG.eventTime} {LIVE_STREAM_CONFIG.timezone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                
                {/* Chat en Vivo */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    💬 Chat en Vivo
                  </h3>
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className="text-sm">
                        <span className="text-blue-400 font-medium">{msg.user}:</span>
                        <span className="text-gray-300 ml-2">{msg.message}</span>
                        <span className="text-gray-500 text-xs ml-2">{msg.time}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500"
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Enviar
                    </button>
                  </div>
                </div>

                {/* Acciones Rápidas */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    🎯 Acciones Rápidas
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                      🔔 Suscribirse a notificaciones
                    </button>
                    
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                      💬 Contactar con Creative Hut
                    </button>
                    
                    <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                      📥 Descargar recursos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* No hay transmisión activa */
            <div className="text-center mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 max-w-4xl mx-auto">
                <div className="text-6xl mb-6">📺</div>
                <h2 className="text-3xl font-bold text-white mb-4">No hay transmisión activa</h2>
                <p className="text-gray-400 text-lg">
                  Actualmente no tenemos ninguna transmisión en vivo. Revisa nuestros próximos eventos programados más abajo.
                </p>
              </div>
            </div>
          )}

          {/* Próximos Eventos */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              📅 Próximas Transmisiones
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {UPCOMING_EVENTS.map((event) => (
                <div key={event.id} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105">
                  
                  {/* Event Header */}
                  <div className={`aspect-video bg-gradient-to-br ${getCategoryStyle(event.category).gradient} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">{event.icon}</div>
                        <div className="bg-black/50 px-3 py-1 rounded-full text-white text-sm font-medium uppercase tracking-wide">
                          {event.category}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Event Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{event.description}</p>
                    
                    {/* Schedule Info */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <p className="text-gray-500">Programado para:</p>
                        <p className="text-blue-400 font-medium">
                          {formatEventDate(event.date, event.time)}
                        </p>
                      </div>
                      <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                        Recordar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-3xl border border-white/20 p-8 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                ¿Quieres ser notificado de nuestras transmisiones?
              </h2>
              <p className="text-gray-300 mb-6">
                Suscríbete a nuestro newsletter y nunca te pierdas nuestros eventos exclusivos en vivo.
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
                Suscribirse al Newsletter
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Minimalista */}
      <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Creative Hut - Transmisión Exclusiva
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Esta transmisión es privada y exclusiva para nuestra comunidad
          </p>
        </div>
      </footer>
      </div>
    </>
  );
}

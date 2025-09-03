'use client';

import { useState, useEffect } from 'react';
import { 
  fetchLiveStreamData, 
  fetchLiveChatMessages, 
  LiveStreamData, 
  LiveChatMessage 
} from '@/lib/livestream-config';

// Hook personalizado para usar datos en tiempo real de YouTube
export const useLiveStreamData = (videoId: string, intervalMs: number = 30000) => {
  const [data, setData] = useState<LiveStreamData | null>(null);
  const [chatMessages, setChatMessages] = useState<LiveChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string>();

  useEffect(() => {
    let chatInterval: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        console.log('🔄 Intentando obtener datos de YouTube para video:', videoId);
        console.log('🔑 API Key configurada:', process.env.NEXT_PUBLIC_YOUTUBE_API_KEY ? 'SÍ' : 'NO');
        const streamData = await fetchLiveStreamData(videoId);
        if (streamData) {
          console.log('✅ Datos de YouTube obtenidos:', streamData);
          setData(streamData);
          setError(null);
        } else {
          console.log('⚠️ No se obtuvieron datos de YouTube');
          setError('No se pudieron obtener datos de la transmisión');
        }
      } catch (err) {
        console.error('❌ Error al obtener datos de YouTube:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      }
      setLoading(false);
    };

    const fetchChat = async () => {
      try {
        const chatData = await fetchLiveChatMessages(videoId, nextPageToken);
        if (chatData) {
          console.log('💬 Nuevos mensajes de chat:', chatData.messages.length);
          setChatMessages((prev: LiveChatMessage[]) => [...prev, ...chatData.messages]);
          setNextPageToken(chatData.nextPageToken);
          
          // Usar el intervalo recomendado por YouTube si está disponible
          if (chatData.pollingIntervalMillis) {
            clearInterval(chatInterval);
            chatInterval = setInterval(fetchChat, chatData.pollingIntervalMillis);
          }
        }
      } catch (err) {
        console.log('💬 Chat no disponible (normal para videos privados):', err);
      }
    };

    // Fetch inicial
    fetchData();
    fetchChat();

    // Configurar intervalos
    const streamIntervalId = setInterval(fetchData, intervalMs);
    const chatIntervalId = setInterval(fetchChat, 5000); // Chat cada 5 segundos por defecto

    return () => {
      clearInterval(streamIntervalId);
      clearInterval(chatIntervalId);
    };
  }, [videoId, intervalMs, nextPageToken]);

  return { data, chatMessages, loading, error };
};

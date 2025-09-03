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

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  autoplay?: boolean;
  muted?: boolean;
  className?: string;
}

export default function YouTubePlayer({ 
  videoId, 
  title, 
  autoplay = true, 
  muted = false,
  className = "w-full h-full"
}: YouTubePlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset states when videoId changes
    setIsLoading(true);
    setHasError(false);
  }, [videoId]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Configuración optimizada para transmisiones privadas
  const embedParams = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    mute: muted ? '1' : '0',
    controls: '1',
    rel: '0', // No mostrar videos relacionados
    modestbranding: '1', // Marca de agua mínima de YouTube
    showinfo: '0', // No mostrar información adicional
    iv_load_policy: '3', // No mostrar anotaciones
    fs: '1', // Permitir pantalla completa
    cc_load_policy: '1', // Mostrar subtítulos si están disponibles
    hl: 'es', // Idioma de la interfaz
    origin: typeof window !== 'undefined' ? window.location.origin : ''
  });

  const embedUrl = `https://www.youtube.com/embed/${videoId}?${embedParams.toString()}`;

  if (hasError) {
    return (
      <div className={`${className} bg-black flex items-center justify-center`}>
        <div className="text-center text-white">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold mb-2">Error al cargar la transmisión</h3>
          <p className="text-gray-400">
            No se pudo conectar con la transmisión. <br />
            Verifica tu conexión o intenta recargar la página.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Recargar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative bg-black`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-lg">Conectando con la transmisión...</p>
          </div>
        </div>
      )}
      
      <iframe
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={className}
        onLoad={handleLoad}
        onError={handleError}
        style={{ 
          border: 'none',
          backgroundColor: '#000'
        }}
      />
    </div>
  );
}

# 🔴 Configuración de Datos Reales de YouTube

Esta guía te explica cómo conectar datos reales de YouTube (viewers y chat) en lugar de usar datos simulados.

## 📋 Pasos para configurar la YouTube Data API v3

### 1. Obtener API Key de YouTube

1. **Ve a Google Cloud Console**: https://console.developers.google.com/
2. **Crea un proyecto nuevo** o selecciona uno existente
3. **Habilita la YouTube Data API v3**:
   - Ve a "APIs y servicios" → "Biblioteca"
   - Busca "YouTube Data API v3"
   - Haz clic en "Habilitar"

4. **Crea credenciales**:
   - Ve a "APIs y servicios" → "Credenciales"
   - Haz clic en "Crear credenciales" → "Clave de API"
   - Copia tu API Key

5. **Restringe la API Key** (Recomendado):
   - Haz clic en tu API Key
   - En "Restricciones de API", selecciona "Restringir clave"
   - Marca solo "YouTube Data API v3"

### 2. Configurar variables de entorno

1. **Crea el archivo `.env.local`** en la raíz del proyecto:
```bash
cp .env.example .env.local
```

2. **Edita `.env.local`** y agrega tu API Key:
```env
NEXT_PUBLIC_YOUTUBE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_ENABLE_REAL_TIME_DATA=true
```

### 3. Configurar la transmisión

1. **Edita** `src/lib/livestream-config.ts`
2. **Cambia** `isLive: true` cuando tengas una transmisión activa
3. **Agrega** el `videoId` de tu transmisión de YouTube

## 🎯 Características de los datos reales

### Datos de Viewers
- ✅ **Viewers concurrentes** en tiempo real
- ✅ **Actualización automática** cada 15 segundos
- ✅ **Fallback a datos simulados** si la API falla

### Chat en Vivo
- ✅ **Mensajes reales** del chat de YouTube
- ✅ **Actualización en tiempo real** cada 5 segundos
- ✅ **Nombres de usuario** reales
- ✅ **Timestamps** precisos

## 🔧 Indicadores visuales

La aplicación muestra indicadores para saber qué tipo de datos está usando:

- 🟢 **Datos reales**: Conectado a YouTube API
- 🟡 **Simulado**: Usando datos de prueba

## ⚠️ Consideraciones importantes

### Límites de la API
- **Cuota diaria**: 10,000 unidades por día (gratis)
- **Consulta de viewers**: ~1 unidad cada 15 segundos
- **Consulta de chat**: ~5 unidades cada 5 segundos

### Transmisiones privadas
- La API de YouTube **NO puede acceder** al chat de videos privados
- Para chat en tiempo real, el video debe ser **público** o **no listado**
- Los viewers pueden obtenerse incluso de videos privados (si tienes permisos)

### Seguridad
- ✅ **API Key en variables de entorno**
- ✅ **Restricciones de API configuradas**
- ✅ **Solo acceso de lectura**

## 🚀 Modo de desarrollo vs Producción

### Desarrollo (localhost)
- Usa `.env.local` para la API Key
- Los datos se actualizan en tiempo real
- Indicadores visuales activos

### Producción
- Configura `NEXT_PUBLIC_YOUTUBE_API_KEY` en tu hosting
- Asegúrate de restringir la API Key a tu dominio
- Monitorea el uso de la cuota de API

## 🔍 Troubleshooting

### La API no está funcionando
1. Verifica que la API Key sea correcta
2. Confirma que YouTube Data API v3 esté habilitada
3. Revisa las restricciones de la API Key
4. Verifica que el video exista y sea accesible

### Sin datos de chat
- El video debe ser público o no listado
- El chat debe estar habilitado en YouTube
- La transmisión debe estar activa

### Cuota de API excedida
- Revisa el uso en Google Cloud Console
- Considera aumentar el intervalo de actualización
- Implementa caché local si es necesario

## 📞 Soporte

Si tienes problemas con la configuración, revisa:
1. Los logs de la consola del navegador
2. Los errores en la terminal de desarrollo
3. El estado de la API en Google Cloud Console

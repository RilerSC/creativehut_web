# Configuración de Variables de Entorno para Gmail SMTP

## Archivo .env.local

Crea un archivo llamado `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
# Usuario de Gmail (tu dirección de correo completa)
GMAIL_USER=tu_correo@gmail.com

# Contraseña de aplicación de Gmail (16 caracteres)
# IMPORTANTE: La contraseña puede venir con espacios, por eso está entre comillas
GMAIL_APP_PASSWORD="tu_contraseña_de_aplicacion_de_16_caracteres"

# Email desde el cual se enviará el correo (normalmente el mismo que GMAIL_USER)
EMAIL_FROM=tu_correo@gmail.com

# Email al cual se recibirán los correos del formulario de contacto
EMAIL_TO=contacto@tudominio.com
```

## Cómo generar una contraseña de aplicación de Gmail

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. Navega a **Seguridad** > **Verificación en dos pasos** (debe estar activada)
3. Busca **Contraseñas de aplicaciones**
4. Selecciona:
   - **Aplicación**: Correo
   - **Dispositivo**: Otro (personalizado) - escribe "Creative Hut Web"
5. Haz clic en **Generar**
6. Copia la contraseña de 16 caracteres generada (puede tener espacios)
7. Pégala en el archivo `.env.local` entre comillas dobles

## Notas importantes

- ⚠️ **NUNCA** subas el archivo `.env.local` al repositorio
- El archivo `.env.local` ya está en `.gitignore` por seguridad
- La contraseña de aplicación puede tener espacios, por eso debe ir entre comillas
- Asegúrate de que la verificación en dos pasos esté activada en tu cuenta de Google






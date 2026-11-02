# Variables de entorno

El único esquema es `.env.example`. Cópialo a `.env.local`. No subas `.env.local`.

Nombres vigentes:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`, `SMTP_TO`
- `NEXT_PUBLIC_YOUTUBE_API_KEY`, `NEXT_PUBLIC_ENABLE_REAL_TIME_DATA`

El código de correo no lee `EMAIL_*` ni `GMAIL_*`. El host previsto es Microsoft 365 (`smtp.office365.com`, puerto `587`, STARTTLS), no Gmail.

En cPanel el sitio es estático y no usa estas variables. `SMTP_*` solo las lee `src/server/email/contact-mailer.ts` cuando ese módulo se conecte a una ruta de servidor en Vercel. `NEXT_PUBLIC_*` queda dentro del JavaScript público: no pongas ahí la contraseña del correo.

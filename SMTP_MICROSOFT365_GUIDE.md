# Envío de correos por SMTP con Microsoft 365 (Office 365) usando **App Password** (STARTTLS 587)

Este documento explica cómo implementar envío de correos vía SMTP con Microsoft 365 de forma **portable** (Python, Next.js/Node, PHP, etc.).  
El patrón es siempre el mismo: **conectar a `smtp.office365.com:587` sin TLS inicial y luego hacer `STARTTLS`**, autenticarse y enviar.

> Recomendación: **no hardcodear** usuario/clave en el código. Usar **variables de entorno** o un secret manager.

---

## Configuración SMTP (Microsoft 365)

- **Host**: `smtp.office365.com`
- **Port**: `587`
- **Secure**: `false` (no TLS directo al conectar)
- **TLS**: **STARTTLS** (se inicia después de conectar)
- **Auth**: usuario + **App Password**

### Requisitos en la cuenta

- **MFA (2FA) habilitado** en la cuenta.
- Generar una **App Password** (contraseña de aplicación).
- Asegurar que el tenant/políticas permiten SMTP Auth si aplica (en algunos entornos está restringido por seguridad).

---

## Variables de entorno recomendadas (estándar reusable)

Define estas variables (en `.env`, secrets del CI/CD, o el entorno del servidor):

- **`SMTP_HOST`**: `smtp.office365.com` (opcional si se deja fijo)
- **`SMTP_PORT`**: `587` (opcional si se deja fijo)
- **`SMTP_USER`**: correo de la cuenta (ej. `scanner@tu-dominio.com`)
- **`SMTP_PASSWORD`**: **App Password** (no la clave normal)
- **`SMTP_FROM`**: (opcional) from que quieres usar; normalmente igual a `SMTP_USER`
- **`SMTP_TO_EMAIL`**: destinatario para pruebas
- **`SMTP_TIMEOUT_SECONDS`**: (opcional) ej. `30`

---

## Diagnóstico rápido de fallos (lo más común)

### 1) Error **535** (Authentication unsuccessful)
Suele indicar problema de credenciales o política:

- App Password incorrecta o expirada
- Estás usando la contraseña normal (no App Password)
- MFA no está habilitado (y por tanto no se emite App Password)
- SMTP Auth deshabilitado a nivel de tenant/usuario

**Qué hacer**: confirmar App Password, confirmar usuario exacto, revisar políticas de SMTP Auth.

### 2) Timeouts / no conecta
- Firewall / red bloqueando salida a `587`
- DNS/route
- Inspección TLS corporativa rompiendo STARTTLS

**Qué hacer**: probar conectividad (ej. `telnet smtp.office365.com 587` o `nc -vz smtp.office365.com 587`).

### 3) STARTTLS falla
Suele ser interceptación TLS o librería antigua.

**Qué hacer**: asegurar TLS moderno, actualizar runtime, probar desde otra red.

---

## Ejemplo en Python (smtplib) — recomendado para pruebas rápidas

En este repo existe `test_smtp.py` que ya implementa:
- conexión a `smtp.office365.com:587`
- `STARTTLS`
- login
- envío
- manejo detallado de errores (incluye autenticación 535, conexión, timeout y traceback)

### Ejecutar

1) Exportar variables:

```bash
export SMTP_USER="tu-cuenta@tu-dominio.com"
export SMTP_PASSWORD="TU_APP_PASSWORD"
export SMTP_TO_EMAIL="destino@ejemplo.com"
export SMTP_TIMEOUT_SECONDS="30"
```

2) Correr:

```bash
python3 test_smtp.py
```

---

## Ejemplo en Next.js / Node.js (nodemailer)

### Instalación

```bash
npm i nodemailer
```

### Config de transporte (STARTTLS 587)

```js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // IMPORTANTE: false para STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD, // App Password
  },
  // Opcional: reduce problemas con servidores estrictos
  tls: {
    // rechazar certificados inválidos normalmente debe ser true.
    // Cambiar a false SOLO para debug en entornos controlados.
    rejectUnauthorized: true,
  },
});

export async function sendTestEmail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_TO_EMAIL,
      subject: `Test SMTP ${new Date().toISOString()}`,
      text: "Correo de prueba SMTP Microsoft 365",
    });
    console.log("OK sendMail:", info);
  } catch (err) {
    console.log("ERROR sendMail (full):", err);
    // Si es auth, suele incluir: err.response / err.code / err.command
  }
}
```

### Nota importante en Next.js

- **No** envíes correos directo desde el **cliente** (browser).  
  Pon esto en una **API Route** (`/app/api/.../route.js` o `/pages/api/...`) o en un backend.
- Guarda `SMTP_PASSWORD` como **secret** (Vercel/CI/CD/env).

---

## Ejemplo en PHP (PHPMailer)

### Instalación (Composer)

```bash
composer require phpmailer/phpmailer
```

### Envío (STARTTLS 587)

```php
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.office365.com';
    $mail->Port       = 587;
    $mail->SMTPAuth   = true;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // STARTTLS

    $mail->Username   = getenv('SMTP_USER');
    $mail->Password   = getenv('SMTP_PASSWORD'); // App Password

    $from = getenv('SMTP_FROM') ?: getenv('SMTP_USER');
    $to   = getenv('SMTP_TO_EMAIL');

    $mail->setFrom($from, 'SMTP Test');
    $mail->addAddress($to);

    $mail->Subject = 'Test SMTP Microsoft 365';
    $mail->Body    = 'Correo de prueba SMTP Microsoft 365';

    $mail->send();
    echo "OK: correo enviado\n";
} catch (Exception $e) {
    echo "ERROR: {$mail->ErrorInfo}\n";
    // Para diagnóstico más crudo:
    var_dump($e);
}
```

---

## HTML “puro” (aclaración importante)

**HTML/JavaScript en el navegador NO puede enviar SMTP directamente** (por seguridad del browser, CORS, y porque revelarías la contraseña).  
La forma correcta es:

- HTML Form → POST → **Backend** (Node/Python/PHP/Java/etc.) → SMTP (Office 365)

Si un proyecto “solo HTML” necesita enviar correos, debes agregar:
- un backend mínimo (API)
- o un servicio intermedio (serverless function)

---

## Checklist de implementación (sirve para cualquier tecnología)

- **Conectar** a `smtp.office365.com` en **587**
- **Iniciar STARTTLS**
- **Autenticar** con `user=email` y `pass=AppPassword`
- **From**: normalmente igual al usuario autenticado
- **Loguear error completo** si falla (código, mensaje, stack)
- **Timeout** explícito (evita cuelgues)
- **Secrets**: siempre por variables de entorno / secret manager

---

## Plantilla de “prompt” para otra AI (para importar a otros proyectos)

Copia y pega esto en el otro proyecto:

> “Necesito implementar envío SMTP con Microsoft 365 usando App Password. Configuración: host `smtp.office365.com`, puerto `587`, `secure=false` y **STARTTLS**. Autenticación: `SMTP_USER` y `SMTP_PASSWORD` (App Password). Implementa una función/endpoint backend (no frontend) que envíe un correo de prueba, con logs completos de errores (especialmente 535 auth, conexión y timeout). Usa variables de entorno y no hardcodees credenciales.”



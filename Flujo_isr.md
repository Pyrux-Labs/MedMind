# Flujo Completo ISR/SSG - Explicación Visual

## ¿Qué es lo que queremos lograr?

**Objetivo:** Que los usuarios en Argentina vean las noticias súper rápido (30-50ms) aunque Strapi esté en NYC (150ms de latencia).

**Solución:** Pre-generar las páginas como HTML estático y servirlas desde servidores edge cercanos a Argentina.

---

## 📊 Comparación: Sin ISR vs Con ISR

### ❌ SIN ISR (Server-Side Rendering tradicional)

```
Usuario en Argentina visita /news
         ↓
  [150ms de latencia]
         ↓
Strapi en NYC procesa request
         ↓
  Consulta PostgreSQL (5ms)
         ↓
  Renderiza HTML (50ms)
         ↓
  [150ms de latencia de vuelta]
         ↓
Usuario ve la página

TOTAL: ~355ms 😞
```

**Problemas:**

- Lento para el usuario
- Cada visita hace request a Strapi
- Mayor carga en el servidor
- Más caro (más compute)

---

### ✅ CON ISR (Incremental Static Regeneration)

```
Usuario en Argentina visita /news
         ↓
  [30-50ms - servidor edge cercano]
         ↓
Vercel sirve HTML pre-generado
         ↓
Usuario ve la página

TOTAL: ~40ms ⚡

---

(En background, solo cuando hay cambios)
Admin publica artículo en Strapi
         ↓
Strapi dispara webhook
         ↓
Next.js regenera /news (10-30 seg)
         ↓
Nuevo HTML listo para próximas visitas
```

**Ventajas:**

- ⚡ Ultra rápido para usuarios (30-50ms)
- 📉 Menos carga en Strapi
- 💰 Más barato (menos requests)
- 🔄 Actualizado automáticamente

---

## 🔄 Flujo detallado paso a paso

### Fase 1: Build Inicial (una sola vez)

```
1. Developer hace deploy:
   $ vercel deploy --prod

2. Next.js durante el build:
   ┌─────────────────────────────────────┐
   │ Build Process                       │
   ├─────────────────────────────────────┤
   │ 1. Fetch a Strapi                   │
   │    GET /api/articles                │
   │                                     │
   │ 2. Genera páginas estáticas:        │
   │    ○ /news (SSG)                    │
   │    ○ /news/1 (SSG)                  │
   │    ○ /news/2 (SSG)                  │
   │    ○ /news/3 (SSG)                  │
   │                                     │
   │ 3. Guarda HTML en Edge Network      │
   └─────────────────────────────────────┘

3. Páginas disponibles en:
   https://medmind.com.ar/news ✅
```

---

### Fase 2: Usuario visita la web (uso normal)

```
┌──────────────────────┐
│ Usuario en Rosario   │
│ Abre /news           │
└──────────────────────┘
          │
          │ Request
          ▼
┌──────────────────────────────────────┐
│ Vercel Edge (servidor en Brasil)    │
│                                      │
│ 1. Busca HTML cacheado              │
│ 2. Lo encuentra ✅                   │
│ 3. Lo envía al usuario              │
└──────────────────────────────────────┘
          │
          │ HTML (30-50ms)
          ▼
┌──────────────────────┐
│ Usuario ve la página │
│ INSTANTÁNEAMENTE ⚡   │
└──────────────────────┘

❌ Strapi NO recibe ningún request
   (No se desperdicia latencia de 150ms)
```

---

### Fase 3: Admin crea/edita artículo (actualización)

```
┌─────────────────────────────────────┐
│ Admin en Strapi (cms.medmind.com.ar)│
│                                     │
│ 1. Crea "Nueva terapia diabetes"   │
│ 2. Sube imagen a Cloudinary         │
│ 3. Click en "Publish"               │
└─────────────────────────────────────┘
          │
          │ [Strapi detecta evento: entry.create]
          ▼
┌─────────────────────────────────────┐
│ Webhook de Strapi                   │
│                                     │
│ POST https://medmind.com.ar/api/revalidate │
│ Headers:                            │
│   x-webhook-secret: abc123...       │
│ Body:                               │
│   {                                 │
│     event: "entry.create",          │
│     entry: {                        │
│       id: 4,                        │
│       slug: "nueva-terapia-diabetes"│
│     }                               │
│   }                                 │
└─────────────────────────────────────┘
          │
          │ [150ms latencia NYC → Vercel]
          ▼
┌─────────────────────────────────────┐
│ Next.js - /api/revalidate           │
│                                     │
│ 1. Valida secret ✅                 │
│ 2. Extrae slug del payload          │
│ 3. Llama a revalidatePath()         │
│    - /news                          │
│    - /news/nueva-terapia-diabetes   │
└─────────────────────────────────────┘
          │
          │ [Next.js hace fetch a Strapi]
          ▼
┌─────────────────────────────────────┐
│ Strapi responde con artículos       │
│ (incluyendo el nuevo)               │
└─────────────────────────────────────┘
          │
          │ [Next.js regenera HTML]
          ▼
┌─────────────────────────────────────┐
│ Nuevo HTML guardado en Edge         │
│                                     │
│ /news                    [UPDATED]  │
│ /news/4                  [NEW]      │
└─────────────────────────────────────┘

⏱️ Tiempo total: 10-30 segundos
```

---

### Fase 4: Usuario visita después de la actualización

```
┌──────────────────────┐
│ Usuario refresca /news│
└──────────────────────┘
          │
          ▼
┌──────────────────────────────────────┐
│ Vercel Edge                          │
│                                      │
│ Encuentra HTML NUEVO (actualizado)  │
└──────────────────────────────────────┘
          │
          ▼
┌──────────────────────┐
│ Ve el nuevo artículo │
│ "Nueva terapia..."   │
└──────────────────────┘

Latencia: 30-50ms ⚡
```

---

### Fase 5: Fallback automático (cada 1 hora)

```
[Pasa 1 hora sin cambios]

Next.js automáticamente:
┌─────────────────────────────────────┐
│ Background Revalidation             │
│                                     │
│ 1. Fetch a Strapi                   │
│ 2. Compara con versión actual       │
│ 3. Si hay diferencias, regenera     │
│ 4. Si no, mantiene cache            │
└─────────────────────────────────────┘

Esto ocurre SIN que el usuario lo note
Por si algún webhook falló
```

---

## 🎯 Casos de uso reales

### Caso 1: Día normal (sin cambios)

```
10:00 - 500 usuarios visitan /news
        → Todos ven HTML cacheado
        → 0 requests a Strapi
        → Latencia: 30-50ms cada uno

14:00 - Revalidación automática (1 hora)
        → Next.js hace 1 fetch a Strapi
        → No hay cambios
        → Mantiene cache

18:00 - 300 usuarios más visitan /news
        → Todos ven HTML cacheado
        → 0 requests a Strapi
        → Latencia: 30-50ms

Total requests a Strapi: 1 (revalidación)
Total usuarios atendidos: 800
Latencia promedio: 40ms ⚡
```

---

### Caso 2: Admin publica artículo nuevo

```
10:00 - Admin crea "Prevención de ACV"
        → Webhook a Next.js
        → Regeneración tarda 20 segundos

10:00:20 - Artículo visible en web

10:01 - 50 usuarios visitan /news
        → Ven el nuevo artículo
        → Latencia: 30-50ms

15:00 - Admin edita el artículo (typo)
        → Webhook a Next.js
        → Regeneración tarda 15 segundos

15:00:15 - Corrección visible en web

Total requests a Strapi: 2 (las regeneraciones)
Tiempo de publicación: ~20 segundos
Latencia usuarios: 30-50ms ⚡
```

---

### Caso 3: Admin elimina artículo

```
10:00 - Admin elimina artículo viejo
        → Webhook: event = "entry.delete"
        → Next.js regenera /news
        → Elimina /news/articulo-viejo

10:00:25 - Artículo ya no aparece en lista
         - Página /news/articulo-viejo → 404

Usuarios que intentan acceder:
→ 404 Not Found (correcto)
```

---

## 📈 Métricas de performance

### Sin ISR (SSR tradicional)

| Métrica           | Valor         |
| ----------------- | ------------- |
| Latencia usuario  | 300-400ms     |
| Requests a Strapi | 1 por visita  |
| 1000 visitas/día  | 1000 requests |
| Carga en servidor | Alta          |
| Costo compute     | Alto          |

### Con ISR

| Métrica           | Valor                    |
| ----------------- | ------------------------ |
| Latencia usuario  | 30-50ms ⚡               |
| Requests a Strapi | ~24/día (revalidaciones) |
| 1000 visitas/día  | ~24 requests             |
| Carga en servidor | Mínima                   |
| Costo compute     | Bajo                     |

**Reducción de requests: 97.6%** 🎉

---

## 🔐 Seguridad del webhook

```
Strapi envía:
POST /api/revalidate
Headers:
  x-webhook-secret: abc123def456...

Next.js verifica:
if (secret !== process.env.REVALIDATE_SECRET) {
  return 401 Unauthorized
}

✅ Solo Strapi puede disparar revalidaciones
❌ Nadie más puede regenerar las páginas
```

---

## 🛠️ Configuraciones clave

### En Next.js:

```typescript
// Hace que la página sea estática
export const revalidate = 3600; // 1 hora

// Pre-genera páginas en build
export async function generateStaticParams() {
	// Retorna lista de IDs/slugs
}

// Regenera on-demand
revalidatePath("/news");
```

### En Strapi:

```
Webhook:
- URL: https://medmind.com.ar/api/revalidate
- Events: create, update, delete, publish
- Header: x-webhook-secret
```

---

## ❓ Preguntas frecuentes

### ¿Qué pasa si Strapi está caído cuando hay que regenerar?

```
Regeneración falla
         ↓
Next.js mantiene cache viejo
         ↓
Usuarios siguen viendo contenido (aunque desactualizado)
         ↓
Cuando Strapi vuelve, próxima revalidación actualiza
```

**Resultado:** El sitio sigue funcionando ✅

---

### ¿Qué pasa si el webhook falla?

```
Webhook falla (timeout, 500, etc)
         ↓
Contenido no se actualiza inmediatamente
         ↓
Pero la revalidación automática (cada 1 hora) lo arregla
```

**Resultado:** Peor caso, cambios visibles en 1 hora

---

### ¿Puedo cambiar el tiempo de revalidación?

```typescript
// Revalidar cada 30 minutos
export const revalidate = 1800;

// Revalidar cada 5 minutos
export const revalidate = 300;

// Revalidar solo on-demand (sin fallback)
export const revalidate = false;
```

---

### ¿Funciona con muchos artículos (100+)?

✅ **SÍ.** Next.js solo pre-genera las páginas más visitadas.

```typescript
export async function generateStaticParams() {
	// Opcional: Limitar a los 50 más recientes
	const articles = await fetch("...?pagination[limit]=50");
	// El resto se generan on-demand cuando se visitan
}
```

---

## 🎯 Resumen ejecutivo

**Lo que tenés ahora:**

- Strapi en NYC (150ms desde Argentina)
- Usuarios consultando directamente

**Lo que vas a tener:**

- Strapi en NYC (150ms) - no cambias nada
- Usuarios viendo HTML pre-generado (30-50ms)
- Actualizaciones automáticas vía webhook

**Resultado:**

- ⚡ 7-10x más rápido para usuarios
- 💰 97% menos requests a Strapi
- 🔄 Actualizado en ~30 segundos
- 🌍 Funciona globalmente (Vercel edge)

**Costo adicional:** $0 (Vercel gratis para hobby projects)

---

**¿Listo para implementar?** Seguí las guías de BACKEND y FRONTEND paso a paso.

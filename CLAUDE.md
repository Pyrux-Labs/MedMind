# MedMind — Contexto del Proyecto

## Descripcion General

MedMind es una empresa de traduccion especializada en **salud y educacion**, entre **ingles y espanol** (EEUU y LATAM). Este repositorio es su sitio web institucional.

**URL de produccion:** `https://www.medmind.com.ar`

---

## Stack Tecnologico

| Tecnologia | Version | Uso |
|---|---|---|
| Next.js | 16 (App Router) | Framework principal |
| TypeScript | 5 | Lenguaje |
| Tailwind CSS | v4 (`@tailwindcss/postcss`) | Estilos |
| next-intl | v4 | i18n (locales: `es`, `en`; default: `es`; prefix: `always`) |
| Strapi | headless CMS en `https://cms.medmind.com.ar` | Noticias/articulos |
| Nodemailer | 8 | Formulario de contacto via SMTP |
| react-markdown | 10 | Renderiza articulos del CMS |
| React Compiler | habilitado | Optimizacion automatica |

> **Nota:** Next.js 16 usa `proxy.ts` en vez de `middleware.ts`.

---

## Estructura de Archivos

```
app/
  layout.tsx              → Root layout (sin HTML wrapper)
  globals.css             → Fuentes, colores, animaciones, utilidades CSS
  manifest.ts             → Web App Manifest (PWA basico)
  sitemap.ts              → Sitemap dinamico (rutas estaticas + articulos CMS)
  robots.ts               → robots.txt
  [locale]/
    layout.tsx            → HTML wrapper, providers, NavBar + Footer, JSON-LD Organization, generateMetadata
    page.tsx              → Landing / Home
    about/page.tsx        → Sobre MedMind
    contact/page.tsx      → Formulario de contacto
    news/page.tsx         → Listado paginado de articulos
    news/[slug]/page.tsx  → Articulo individual (JSON-LD Article)
  api/contact/route.ts    → POST endpoint con honeypot, validacion, Nodemailer

components/
  common/                 → NavBar, Footer, MainButton, Title, LanguageDropdown, MobileMenu, SocialButton, Toast, ArticleLocaleContext
  Landing/                → Top (hero), Content (imagen+texto), Service, Values, Contact (CTA)
  AboutUs/                → Top, CardsContainer (flip cards), Card, Content (fundadoras), Founder
  ContactUs/              → Form (con paises i18n), Footer (info contacto)
  News/                   → Card, Content (markdown), Top, Pagination, Footer (autor)

hooks/useScrollReveal.ts  → IntersectionObserver, threshold 0.15, trigger once
i18n/                     → routing, navigation, request, locales/{en,es}.json
lib/                      → strapi.ts (URLs), api/articles.ts (fetch paginado)
proxy.ts                  → Middleware de next-intl
```

---

## Fuentes Tipograficas

| Fuente | Uso | Peso | Archivo |
|---|---|---|---|
| Butler | Titulos (`.main-title`) | 500 | `Butler-Medium.woff2` |
| Cooper Hewitt | Subtitulos, textos, labels | 500/375 | `CooperHewitt-Medium/Book.woff2` |
| Nunito Sans | Botones (`.button`) | 600 | `NunitoSans-SemiBold.woff2` |

> La variable CSS `--keep-calm` apunta a `"Nunito Sans"` (nombre legacy, no renombrar).

---

## Paleta de Colores (NO MODIFICAR)

| Variable CSS | Valor | Uso |
|---|---|---|
| `--color-main-color` | `hsl(186, 100%, 13%)` | Color principal / textos |
| `--color-text-color` | `hsl(186, 100%, 13%, 80%)` | Texto body |
| `--color-footer-labels` | `hsl(186, 100%, 13%, 60%)` | Labels del footer |
| `--color-main-bg` | `hsl(187, 13%, 87%)` | Fondo principal |
| `--color-secondary-bg` | `hsl(47, 18%, 80%)` | Fondo secundario |
| `--color-secondary-color` | `hsl(167, 24%, 66%)` | Acentos |
| `--color-white` | `#ffffff` | Blanco |
| `--color-red` | `hsl(359, 100%, 61%)` | Errores |

---

## Animaciones

Todas son suaves y fluidas (marca serena). Trigger por IntersectionObserver, una sola vez.

- `.slide-in-left / .slide-in-right` — Content, Service, Values (800ms)
- `.fade-up` — Contact CTA, CardsContainer, Title (700ms)
- `.scale-in` — AboutUs Cards con stagger (700ms)
- `.hero-title / .hero-subtitle / .hero-cta` — Hero entrance
- `.animate-page-in` — Page transition (400ms)
- Delays: `.reveal-delay-1` (200ms), `.reveal-delay-2` (400ms), `.reveal-delay-3` (600ms)

---

## SEO Implementado

- `generateMetadata` en todas las paginas (OpenGraph, Twitter Cards, keywords, hreflang)
- Sitemap dinamico con articulos del CMS
- `robots.ts` (allow all, disallow `/api/`)
- JSON-LD Organization (layout) + JSON-LD Article (news/[slug])
- Meta descriptions unicas por pagina en ambos idiomas
- Manifest.ts para PWA basico
- Honeypot en formulario de contacto (anti-spam)

---

## Responsive Design

- Mobile-first con breakpoints: `sm:` 640px, `md:` 768px, `lg:` 1024px, `xl:` 1280px, `2xl:` 1536px
- Wrapper principal: `px-5 md:px-8 lg:mx-[8%] xl:mx-auto xl:max-w-7xl xl:px-6`
- Tipografia responsive con `clamp()`
- `overflow-x-hidden` en body para evitar scroll horizontal

---

## Reglas para Modificaciones

1. **NO cambiar colores** — definidos en manual de marca
2. **NO cambiar fuentes** — Butler, Cooper Hewitt, Nunito Sans son oficiales
3. **NO agregar dependencias innecesarias** — bundle liviano
4. **NO sobre-animar** — respetar serenidad de marca
5. **NO usar lenguaje urgente/comercial** — tono calmo, profesional
6. **Textos nuevos** deben estar en ambos JSONs (`en.json` / `es.json`)
7. **Sanitizar inputs** — formulario maneja info sensible
8. **SEO primero** — considerar impacto en posicionamiento
9. **Usar clases de Tailwind v4** — evitar CSS custom innecesario
10. **Preferir edicion de archivos existentes** — no crear archivos innecesarios

---

## Personalidad de Marca (resumen)

MedMind es **serena, responsable y humana**. Comunica con calma, claridad y criterio. Arquetipo: El Cuidador + El Sabio. Sensacion al interactuar: _"Esto esta en buenas manos."_

Publico: instituciones de salud y educacion, clinicas, universidades, profesionales con documentacion sensible.

---

## Variables de Entorno Requeridas

```
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE
SMTP_FROM_NAME, SMTP_FROM, SMTP_TO
NEXT_PUBLIC_STRAPI_URL (default: https://cms.medmind.com.ar)
```

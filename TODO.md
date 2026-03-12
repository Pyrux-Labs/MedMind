# MedMind — TODO / Estado del Proyecto

> Última actualización: Junio 2025

---

## ✅ COMPLETADO

### Bugs y Errores

- [x] **Fuente Keep Calm reemplazada** → Nunito Sans SemiBold 600 (`NunitoSans-SemiBold.woff2`)
- [x] **proxy.ts** → Verificado que Next.js 16 usa `proxy.ts` (no middleware.ts), se restauró correctamente
- [x] **console.logs eliminados** → 3 `console.log()` removidos de `components/News/Footer.tsx`
- [x] **HTML sanitizado en API de contacto** → `escapeHtml()`, validación server-side, límite 10MB adjuntos
- [x] **Footer links corregidos** → Usa `Link` de `@/i18n/navigation` para respetar locale
- [x] **Pagination links corregidos** → Usa `Link` de `@/i18n/navigation`

### Performance

- [x] **Imágenes comprimidas** → De ~63MB total a ~1MB total (sharp, quality 80-82%, max 1920px)
- [x] **`font-display: swap`** → Agregado a las 4 declaraciones `@font-face`
- [x] **Loading states** → `loading.tsx` (spinner) y `news/loading.tsx` (skeleton cards)
- [x] **Image `sizes` prop** → Agregado en Content, Service, Values, Founder, News/Card

### SEO

- [x] **Metadata completa** → `generateMetadata` en todas las páginas con OG, Twitter Cards, keywords
- [x] **Sitemap dinámico** → `app/sitemap.ts` con rutas estáticas + artículos del CMS
- [x] **robots.ts** → Allow all, disallow `/api/`, referencia al sitemap
- [x] **JSON-LD** → Organization (layout global) + Article (news/[slug])
- [x] **Meta descriptions** → Únicas por página, 155 chars, en ambos idiomas
- [x] **hreflang + metadataBase** → Alternates configurados para es/en
- [x] **manifest.ts** → PWA básico con theme-color y nombre

### Código / Limpieza

- [x] **Typo "Abaut" corregido** → Carpetas renombradas a `AboutUs/` y `about/`, CSS actualizado
- [x] **Hook muerto eliminado** → `hooks/useLanguageDropdown.ts` borrado
- [x] **Root layout simplificado** → Removidos imports innecesarios
- [x] **error.tsx + not-found.tsx** → Páginas de error y 404 con i18n

### Responsive Design

- [x] **Tipografía responsive** → `clamp()` en main-title, subtitle, contact_us, text
- [x] **NavBar + MobileMenu** → Hamburger menu para mobile, slide-in panel
- [x] **Landing page responsive** → Top, Content, Service, Values, Contact
- [x] **About page responsive** → Top, Cards, Content, Founder
- [x] **Contact page responsive** → Form, Footer
- [x] **News page responsive** → Grid, Card, Top, Content, Pagination
- [x] **Footer global responsive** → flex-col→row, centrado mobile, hover transitions
- [x] **Main wrapper responsive** → `px-5 md:px-8 lg:mx-[8%] xl:mx-auto xl:max-w-7xl`
- [x] **Title component responsive** → Margin responsive con `my-16 md:my-30`

### Animaciones

- [x] **useScrollReveal hook** → IntersectionObserver, threshold configurable, triggers once
- [x] **Slide-in laterales** → Content, Service, Values (izquierda/derecha según layout)
- [x] **Fade-up** → Contact CTA, CardsContainer, Title
- [x] **Scale-in** → AboutUs cards (staggered)
- [x] **Hero entrance** → Landing Top + About Top (keyframes)
- [x] **Page transition** → CSS fade+slide en el main wrapper

### Hover States / A11y

- [x] **MainButton** → Hover con scale + border swap, responsive sizing
- [x] **News Card** → Hover shadow + translate-y
- [x] **SocialButton** → `aria-label` descriptivo + hover opacity
- [x] **LanguageDropdown** → `role="button"`, `aria-expanded`, `aria-label`, keyboard support
- [x] **Footer links** → Hover opacity transitions
- [x] **NavBar** → `role="navigation"`, `aria-label`, hover transitions

---

## 🔧 TAREAS PENDIENTES (Manuales)

> Estas tareas requieren acción manual del usuario o acceso a herramientas/servicios externos.

### 1. Favicon PNG

Actualmente el favicon usa el SVG del logo (`/icons/favicon.svg`). Para mejor compatibilidad:

- Exportar el logo como PNG en tamaños: **16×16**, **32×32**, **180×180** (apple-touch-icon), **192×192**, **512×512**
- Colocar en `public/icons/`
- Actualizar `app/manifest.ts` para incluir los PNGs
- Agregar `apple-touch-icon` en el layout si es necesario

### 2. Verificar responsive visualmente

Abrir la app en las resoluciones listadas en `.context.md` y verificar:

- 360×800, 375×667, 390×844, 412×915, 430×932 (phones)
- 768×1024, 820×1180, 1024×1366 (tablets)
- 1280×800, 1366×768, 1920×1080 (laptops)
  Ajustar spacings o tamaños si algún breakpoint se ve mal.

### 3. Run Lighthouse

Ejecutar Lighthouse en producción para cada página:

- `/es`, `/en` (landing)
- `/es/about`, `/en/about`
- `/es/contact`, `/en/contact`
- `/es/news`, `/en/news`
  Target: **90+** en Performance, Accessibility, Best Practices, SEO.

### 4. Rate limiting en producción

El API route de contacto (`app/api/contact/route.ts`) no tiene rate limiting. Opciones:

- Usar **Vercel KV** o **Upstash Redis** con un rate limiter
- O usar un middleware de Cloudflare/Vercel Edge

### 5. Imagen OG dedicada

Actualmente los OpenGraph images usan el SVG del logo. Para mejor apariencia en previews de redes sociales:

- Crear una imagen OG de **1200×630px** con el logo + tagline sobre fondo de marca
- Colocar en `public/og-image.png`
- Actualizar la metadata en `app/[locale]/layout.tsx`

### 6. Configurar URL de producción como env var

El `BASE_URL` está hardcodeado como `https://www.medmindls.com` en el layout. Considerar:

- Moverlo a una variable de entorno `NEXT_PUBLIC_SITE_URL`
- Actualizar los archivos que lo usan: layout, sitemap, robots

### 7. Verificar que las imágenes del CMS cargan correctamente

Las imágenes de Strapi (artículos) se cargan como dominios externos. Verificar que `next.config.ts` tiene el dominio de Strapi en `images.remotePatterns`.

### 8. Google Search Console

- Verificar el sitio en Google Search Console
- Enviar el sitemap (`https://www.medmindls.com/sitemap.xml`)
- Monitorear indexación

---

## 📝 NOTAS

- **Next.js 16** usa `proxy.ts` en vez de `middleware.ts` (el framework deprecó el nombre anterior)
- La variable CSS `--keep-calm` ahora apunta a `"Nunito Sans"` — valor cambiado, variable no renombrada para no romper referencias
- Las imágenes de `public/abaut/` fueron movidas a `public/about/` — verificar que no queden referencias rotas
- `sharp` está instalado como devDependency para la compresión de imágenes

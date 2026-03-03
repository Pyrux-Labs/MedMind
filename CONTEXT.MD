# CONTEXTO DEL PROYECTO - IMPLEMENTACIÓN DE i18n CON next-intl

## OBJETIVO

Implementar internacionalización (i18n) en el proyecto MedMind usando **next-intl**, que es la mejor práctica para Next.js 15/16 con App Router y TypeScript.

## STACK TECNOLÓGICO ACTUAL

- Next.js 15/16
- TypeScript
- Tailwind CSS
- Strapi (backend)
- App Router

## REQUISITOS DE IMPLEMENTACIÓN

### 1. INSTALAR DEPENDENCIAS

```bash
npm install next-intl
```

### 2. ESTRUCTURA DE CARPETAS REQUERIDA

```
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── about/
│       │   └── page.tsx
│       ├── contact/
│       │   └── page.tsx
│       └── news/
│           └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # MODIFICAR ESTE COMPONENTE
│   │   └── Footer.tsx
│   └── LanguageSwitcher.tsx    # CREAR ESTE COMPONENTE
├── i18n/
│   └── request.ts              # CREAR
├── messages/
│   ├── es.json                 # CREAR (contenido adjunto)
│   └── en.json                 # CREAR (contenido adjunto)
└── middleware.ts               # CREAR
```

### 3. ARCHIVOS A CREAR

#### `next.config.mjs` (o modificar el existente)

```typescript
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	// mantén tu configuración actual aquí
};

export default withNextIntl(nextConfig);
```

#### `src/middleware.ts`

```typescript
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
	locales: ["es", "en"],
	defaultLocale: "es",
	localePrefix: "always", // URLs siempre con prefijo: /es/about, /en/about
});

export const config = {
	matcher: ["/", "/(es|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

#### `src/i18n/request.ts`

```typescript
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
	messages: (await import(`../messages/${locale}.json`)).default,
}));
```

#### `src/app/[locale]/layout.tsx` (modificar el layout actual)

```typescript
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';

const locales = ['es', 'en'];

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Validar que el locale sea válido
  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

#### `src/components/LanguageSwitcher.tsx` (CREAR)

```typescript
'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useLocale} from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  // Remueve el locale actual del pathname
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  return (
    <div className="flex gap-2 items-center">
      <Link
        href={`/es${pathnameWithoutLocale}`}
        className={`px-3 py-1 rounded transition-colors ${
          locale === 'es'
            ? 'bg-blue-600 text-white font-semibold'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Español
      </Link>
      <span className="text-gray-400">|</span>
      <Link
        href={`/en${pathnameWithoutLocale}`}
        className={`px-3 py-1 rounded transition-colors ${
          locale === 'en'
            ? 'bg-blue-600 text-white font-semibold'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        English
      </Link>
    </div>
  );
}
```

#### `src/components/layout/Navbar.tsx` (MODIFICAR EL EXISTENTE)

```typescript
'use client';

import Link from 'next/link';
import {useTranslations} from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          MedMind
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
            {t('home')}
          </Link>
          <Link href="/news" className="text-gray-700 hover:text-blue-600 transition">
            {t('news')}
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
            {t('about')}
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
            {t('contact')}
          </Link>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
```

### 4. EJEMPLO DE USO EN PÁGINAS

#### `src/app/[locale]/page.tsx`

```typescript
import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations('hero');
  const tHealth = useTranslations('health');
  const tEducation = useTranslations('education');

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('subtitle')}
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
            {t('cta')}
          </button>
        </div>
      </section>

      {/* Health Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">{tHealth('title')}</h2>
          <p className="text-gray-600 mb-6">{tHealth('description')}</p>
          <ul className="space-y-2">
            {tHealth.raw('items').map((item: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Education Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">{tEducation('title')}</h2>
          <p className="text-gray-600 mb-6">{tEducation('description')}</p>
          <ul className="space-y-2">
            {tEducation.raw('items').map((item: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
```

### 5. METADATA LOCALIZADA (SEO)

#### `src/app/[locale]/layout.tsx` (añadir metadata)

```typescript
import { useTranslations } from "next-intl";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({ locale, namespace: "meta" });

	return {
		title: t("title"),
		description: t("description"),
	};
}
```

### 6. LINKS INTERNOS (IMPORTANTE)

**TODOS los Links deben usar el locale automáticamente:**

```typescript
import {Link} from 'next-intl';

// En lugar de:
<Link href="/about">About</Link>

// Usar:
<Link href="/about">About</Link> // next-intl añade automáticamente /es/ o /en/
```

### 7. ARCHIVOS JSON DE TRADUCCIONES

Los archivos `messages/es.json` y `messages/en.json` se adjuntan por separado.

## INSTRUCCIONES PARA LA IA

1. **INSTALAR** la dependencia `next-intl`
2. **CREAR** todos los archivos de configuración mencionados arriba
3. **MODIFICAR** la estructura de carpetas moviendo todo dentro de `app/[locale]/`
4. **MODIFICAR** el componente Navbar existente para usar traducciones
5. **CREAR** el componente LanguageSwitcher
6. **ACTUALIZAR** todas las páginas para usar `useTranslations`
7. **CREAR** los archivos `messages/es.json` y `messages/en.json` con el contenido adjunto
8. **VERIFICAR** que todos los Links usen el locale correcto

## RESULTADO ESPERADO

- ✅ URLs localizadas: `/es/`, `/en/`, `/es/about`, `/en/about`
- ✅ Navbar con traducciones funcionando
- ✅ Switcher de idioma funcional
- ✅ Todas las páginas traducidas
- ✅ SEO optimizado con metadata localizada
- ✅ Type-safety completo en TypeScript

## PRIORIDAD DE IMPLEMENTACIÓN

1. Configuración base (middleware, i18n/request.ts, next.config)
2. Archivos JSON de traducciones
3. Layout con [locale]
4. Navbar y LanguageSwitcher
5. Páginas principales (home, about, contact)
6. Metadata y SEO

## NOTAS IMPORTANTES

- **NO** modificar la configuración de Tailwind ni Strapi por ahora
- **MANTENER** todos los estilos actuales de Tailwind
- **USAR** Server Components donde sea posible
- **VALIDAR** que el locale sea válido en el layout
- Los archivos JSON contienen TODO el contenido, no dividir en múltiples archivos por ahora

#Solucionado.

Components updated with useTranslations():

NavBar, Footer, LanguageDropdown, Landing (Top, Content, Service, Values, Contact), AbautUs (Top, CardsContainer, Content, Card, Founder), ContactUs (Form, Footer), News (Top, Content, Pagination), common Title, MainButton
Routes now available:

/es/, /en/, /es/about, /en/about, /es/contact, /en/contact, /es/news, /en/news
Language switching via the dropdown navigates between locales preserving the current page

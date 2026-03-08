# Guía de Fetch de Artículos — MedMind Frontend (Next.js 15)

Guía completa para consumir la API de artículos de Strapi desde el frontend Next.js.

---

## Estructura de Datos de la API

### GET `/api/articles?populate=cover&locale=es`

```json
{
	"data": [
		{
			"id": 1,
			"documentId": "abc123def456",
			"title": "Nuevo avance en cardiología",
			"slug": "nuevo-avance-en-cardiologia",
			"content": "<p>Contenido del artículo en formato rich text...</p>",
			"author": "Dra. María López",
			"locale": "es",
			"createdAt": "2026-01-15T10:30:00.000Z",
			"updatedAt": "2026-01-16T08:00:00.000Z",
			"publishedAt": "2026-01-15T12:00:00.000Z",
			"cover": {
				"id": 5,
				"name": "cardiologia-avance.jpg",
				"alternativeText": "Imagen de avance en cardiología",
				"caption": null,
				"width": 3000,
				"height": 2000,
				"url": "/uploads/cardiologia_avance_a1b2c3d4e5.jpg",
				"formats": {
					"thumbnail": {
						"name": "thumbnail_cardiologia-avance.jpg",
						"width": 245,
						"height": 163,
						"url": "/uploads/thumbnail_cardiologia_avance_a1b2c3d4e5.jpg",
						"size": 12.5
					},
					"small": {
						"name": "small_cardiologia-avance.jpg",
						"width": 500,
						"height": 333,
						"url": "/uploads/small_cardiologia_avance_a1b2c3d4e5.jpg",
						"size": 45.2
					},
					"medium": {
						"name": "medium_cardiologia-avance.jpg",
						"width": 750,
						"height": 500,
						"url": "/uploads/medium_cardiologia_avance_a1b2c3d4e5.jpg",
						"size": 98.7
					},
					"large": {
						"name": "large_cardiologia-avance.jpg",
						"width": 1440,
						"height": 960,
						"url": "/uploads/large_cardiologia_avance_a1b2c3d4e5.jpg",
						"size": 320.1
					},
					"xlarge": {
						"name": "xlarge_cardiologia-avance.jpg",
						"width": 1920,
						"height": 1280,
						"url": "/uploads/xlarge_cardiologia_avance_a1b2c3d4e5.jpg",
						"size": 580.3
					}
				}
			}
		}
	],
	"meta": {
		"pagination": {
			"page": 1,
			"pageSize": 25,
			"pageCount": 3,
			"total": 62
		}
	}
}
```

> **Nota:** El campo `size` en los formatos está en KB.

---

## TypeScript Types

```typescript
// types/article.ts

export interface ImageFormat {
	name: string;
	width: number;
	height: number;
	url: string;
	size: number; // en KB
}

export interface Cover {
	id: number;
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	url: string;
	formats: {
		thumbnail?: ImageFormat;
		small?: ImageFormat;
		medium?: ImageFormat;
		large?: ImageFormat;
		xlarge?: ImageFormat;
	};
}

export interface Article {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	content: string;
	author: string;
	locale: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	cover: Cover | null;
}

export interface StrapiResponse<T> {
	data: T;
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}
```

---

## Helper Functions

```typescript
// lib/strapi.ts

const STRAPI_URL =
	process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Construir URL completa de la API de Strapi
 */
export function getStrapiURL(path: string = ""): string {
	return `${STRAPI_URL}${path}`;
}

/**
 * Construir URL completa de un archivo media de Strapi.
 * Las URLs de Strapi son relativas (/uploads/...), esta función las hace absolutas.
 */
export function getStrapiMediaURL(
	url: string | null | undefined,
): string | null {
	if (!url) return null;

	// Si ya es absoluta, devolverla tal cual
	if (url.startsWith("http")) return url;

	return `${STRAPI_URL}${url}`;
}
```

---

## Fetch Functions

```typescript
// lib/api/articles.ts

import type { Article, StrapiResponse } from "@/types/article";
import { getStrapiURL } from "@/lib/strapi";

/**
 * Obtener lista de artículos con paginación.
 *
 * @param locale - "es" | "en"
 * @param page - Número de página (default: 1)
 * @param pageSize - Artículos por página (default: 25)
 */
export async function fetchArticles(
	locale: string = "es",
	page: number = 1,
	pageSize: number = 25,
): Promise<StrapiResponse<Article[]>> {
	const params = new URLSearchParams({
		locale,
		populate: "cover",
		sort: "publishedAt:desc",
		"pagination[page]": String(page),
		"pagination[pageSize]": String(pageSize),
		publicationState: "live",
	});

	const res = await fetch(getStrapiURL(`/api/articles?${params}`), {
		next: { revalidate: 60 }, // Revalidar cada 60 segundos
	});

	if (!res.ok) {
		throw new Error(`Error ${res.status} al obtener artículos`);
	}

	return res.json();
}

/**
 * Obtener un artículo individual por documentId.
 */
export async function fetchArticle(
	documentId: string,
	locale: string = "es",
): Promise<Article | null> {
	const params = new URLSearchParams({
		locale,
		populate: "cover",
	});

	const res = await fetch(
		getStrapiURL(`/api/articles/${documentId}?${params}`),
		{ next: { revalidate: 60 } },
	);

	if (!res.ok) {
		if (res.status === 404) return null;
		throw new Error(`Error ${res.status} al obtener artículo`);
	}

	const json = await res.json();
	return json.data;
}
```

---

## Componentes

### ArticleCard (Listado — usa `medium` 750px)

```tsx
// components/ArticleCard.tsx

import Image from "next/image";
import Link from "next/link";
import { getStrapiMediaURL } from "@/lib/strapi";
import type { Article } from "@/types/article";

interface ArticleCardProps {
	article: Article;
	locale: string;
}

export function ArticleCard({ article, locale }: ArticleCardProps) {
	// Prioridad: medium → small → original
	const coverUrl = getStrapiMediaURL(
		article.cover?.formats?.medium?.url ||
			article.cover?.formats?.small?.url ||
			article.cover?.url,
	);

	return (
		<Link
			href={`/${locale}/news/${article.documentId}`}
			className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
			{/* Card con aspecto 372x286 */}
			<div className="relative w-full aspect-[372/286] bg-gray-200">
				{coverUrl ? (
					<Image
						src={coverUrl}
						alt={article.cover?.alternativeText || article.title}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 372px"
					/>
				) : (
					<div className="flex items-center justify-center h-full">
						<span className="text-gray-400 text-4xl">📰</span>
					</div>
				)}
			</div>

			<div className="p-4">
				<h2 className="text-xl font-semibold mb-2">{article.title}</h2>
				<p className="text-sm text-gray-500">
					{article.author} ·{" "}
					{new Date(article.publishedAt).toLocaleDateString(
						locale === "es" ? "es-AR" : "en-US",
					)}
				</p>
			</div>
		</Link>
	);
}
```

### ArticlePage (Individual — usa `xlarge` 1920px)

```tsx
// components/ArticlePage.tsx

import Image from "next/image";
import Link from "next/link";
import { getStrapiMediaURL } from "@/lib/strapi";
import type { Article } from "@/types/article";

interface ArticlePageProps {
	article: Article;
	locale: string;
}

export function ArticlePage({ article, locale }: ArticlePageProps) {
	// Prioridad: xlarge → large → original
	const heroUrl = getStrapiMediaURL(
		article.cover?.formats?.xlarge?.url ||
			article.cover?.formats?.large?.url ||
			article.cover?.url,
	);

	return (
		<article className="container mx-auto px-4 py-8 max-w-4xl">
			{/* Hero con aspecto 1440x303 */}
			{heroUrl && (
				<div className="relative w-full aspect-[1440/303] mb-8 rounded-lg overflow-hidden">
					<Image
						src={heroUrl}
						alt={article.cover?.alternativeText || article.title}
						fill
						className="object-cover"
						sizes="(max-width: 1440px) 100vw, 1440px"
						priority // Carga prioritaria para imagen hero (mejora LCP)
					/>
				</div>
			)}

			<header className="mb-8">
				<h1 className="text-4xl font-bold mb-4">{article.title}</h1>
				<div className="text-sm text-gray-500">
					{article.author} ·{" "}
					{new Date(article.publishedAt).toLocaleDateString(
						locale === "es" ? "es-AR" : "en-US",
						{ year: "numeric", month: "long", day: "numeric" },
					)}
				</div>
			</header>

			<div
				className="prose prose-lg max-w-none"
				dangerouslySetInnerHTML={{ __html: article.content }}
			/>

			<footer className="mt-12 pt-6 border-t">
				<Link
					href={`/${locale}/news`}
					className="text-blue-600 hover:underline">
					← Volver a noticias
				</Link>
			</footer>
		</article>
	);
}
```

---

## Best Practices

### 1. Prop `sizes` — Indicar al navegador qué tamaño cargar

```tsx
// Cards en grid de 3 columnas
<Image sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 372px" />

// Hero full-width
<Image sizes="(max-width: 1440px) 100vw, 1440px" />
```

Sin `sizes`, el navegador descarga la imagen más grande disponible.

### 2. `priority` vs lazy loading

```tsx
// Hero image (above the fold) → priority
<Image priority src={heroUrl} ... />

// Cards de listado (pueden estar below the fold) → lazy (default)
<Image src={cardUrl} ... />
```

- `priority` descarga la imagen inmediatamente. Usar solo para la imagen principal visible al cargar.
- Por defecto, Next.js usa `loading="lazy"` que espera a que la imagen esté cerca del viewport.

### 3. Fallbacks cuando no hay imagen

```tsx
const coverUrl = getStrapiMediaURL(
	article.cover?.formats?.medium?.url ||
		article.cover?.formats?.small?.url ||
		article.cover?.url,
);

// Si no hay imagen, mostrar placeholder
{
	coverUrl ? (
		<Image src={coverUrl} alt={article.title} fill className="object-cover" />
	) : (
		<div className="bg-gray-200 flex items-center justify-center h-full">
			<span className="text-gray-400 text-4xl">📰</span>
		</div>
	);
}
```

### 4. Cache strategies

```typescript
// Contenido que cambia frecuentemente → revalidar cada 60s
fetch(url, { next: { revalidate: 60 } });

// Contenido estático (raro que cambie) → revalidar cada hora
fetch(url, { next: { revalidate: 3600 } });

// Siempre fresco (admin previews, drafts) → sin cache
fetch(url, { cache: "no-store" });
```

### 5. Configurar dominio de imágenes en `next.config.ts`

```typescript
// next.config.ts
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cms.medmind.com.ar", // Producción
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "1337", // Desarrollo
			},
		],
	},
};

export default nextConfig;
```

---

## Qué versión de imagen usar en cada contexto

| Contexto            | Formato             | Ancho  | Peso aprox. |
| ------------------- | ------------------- | ------ | ----------- |
| Cards de listado    | `formats.medium`    | 750px  | ~200-300 KB |
| Hero de artículo    | `formats.xlarge`    | 1920px | ~500-800 KB |
| Thumbnails/previews | `formats.thumbnail` | 245px  | ~30-50 KB   |
| Mobile              | `formats.small`     | 500px  | ~100-150 KB |
| Tablet              | `formats.medium`    | 750px  | ~200-300 KB |
| Desktop 1440p       | `formats.large`     | 1440px | ~400-600 KB |

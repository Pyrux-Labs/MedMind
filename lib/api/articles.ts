import type { Article, StrapiResponse } from "@/types/article";
import { getStrapiURL } from "@/lib/strapi";

/**
 * Obtener lista de artículos con paginación.
 *
 * @param locale - "es" | "en"
 * @param page - Número de página (default: 1)
 * @param pageSize - Artículos por página (default: 9)
 */
export async function fetchArticles(
	locale: string = "es",
	page: number = 1,
	pageSize: number = 9,
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
		next: { revalidate: 60 },
	});

	if (!res.ok) {
		throw new Error(`Error ${res.status} al obtener artículos`);
	}

	return res.json();
}

/**
 * Obtener un artículo individual por slug.
 */
export async function fetchArticleBySlug(
	slug: string,
	locale: string = "es",
): Promise<Article | null> {
	const params = new URLSearchParams({
		locale,
		populate: "cover",
		"filters[slug][$eq]": slug,
	});

	const res = await fetch(
		getStrapiURL(`/api/articles?${params}`),
		{ next: { revalidate: 60 } },
	);

	if (!res.ok) {
		throw new Error(`Error ${res.status} al obtener artículo`);
	}

	const json = await res.json();
	return json.data?.[0] ?? null;
}

import { getStrapiURL } from "@/lib/strapi";

export interface ArticleCover {
    url: string;
    alternativeText: string | null;
}

export interface ArticleAuthor {
    fullname: string;
    avatar: {
        url: string;
        alternativeText: string | null;
    } | null;
}
export interface ArticleLocalization {
    slug: string;
    locale: string;
}

export interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    publishedAt: string;
    author?: ArticleAuthor;
    cover?: ArticleCover;
    localizations?: ArticleLocalization[];
}

export interface StrapiResponse<T> {
    data: T;
    meta: {
        pagination: {
            page: number;
            pageCount: number;
        };
    };
}

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
        "populate[cover][fields][0]": "url",
        "populate[cover][fields][1]": "alternativeText",
        "populate[author][fields][0]": "fullname",
        "populate[author][populate][avatar][fields][0]": "url",
        "populate[author][populate][avatar][fields][1]": "alternativeText",
        sort: "publishedAt:desc",
        "pagination[page]": String(page),
        "pagination[pageSize]": String(pageSize),
    });
    const res = await fetch(getStrapiURL(`/api/articles?${params}`), {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`Error ${res.status} al obtener artículos: ${body}`);
    }

    return res.json();
}

/**
 * Obtener un artículo individual por slug.
 * Popula localizations para obtener el slug del mismo artículo en otros idiomas,
 * lo que permite que el LanguageDropdown navegue a la URL correcta al cambiar de locale.
 */
export async function fetchArticleBySlug(
    slug: string,
    locale: string = "es",
): Promise<Article | null> {
    const params = new URLSearchParams({
        locale,
        "populate[cover][fields][0]": "url",
        "populate[cover][fields][1]": "alternativeText",
        "populate[author][fields][0]": "fullname",
        "populate[author][populate][avatar][fields][0]": "url",
        "populate[author][populate][avatar][fields][1]": "alternativeText",
        "populate[localizations][fields][0]": "slug",
        "populate[localizations][fields][1]": "locale",
        "filters[slug][$eq]": slug,
    });

    let res: Response;
    try {
        res = await fetch(getStrapiURL(`/api/articles?${params}`), {
            next: { revalidate: 60 },
        });
    } catch {
        return null;
    }

    if (!res.ok) {
        return null;
    }

    const json = await res.json();
    return json.data?.[0] ?? null;
}

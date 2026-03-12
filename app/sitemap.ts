import type { MetadataRoute } from "next";
import { fetchArticles } from "@/lib/api/articles";

const BASE_URL = "https://www.medmindls.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = ["", "/about", "/contact", "/news"];
    const locales = ["es", "en"];

    const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
        staticRoutes.map((route) => ({
            url: `${BASE_URL}/${locale}${route}`,
            lastModified: new Date(),
            changeFrequency:
                route === "/news" ? ("weekly" as const) : ("monthly" as const),
            priority: route === "" ? 1 : 0.8,
            alternates: {
                languages: Object.fromEntries(
                    locales.map((l) => [l, `${BASE_URL}/${l}${route}`]),
                ),
            },
        })),
    );

    // Fetch articles for both locales
    const articleEntries: MetadataRoute.Sitemap = [];
    for (const locale of locales) {
        try {
            const { data: articles } = await fetchArticles(locale, 1, 100);
            for (const article of articles) {
                articleEntries.push({
                    url: `${BASE_URL}/${locale}/news/${article.slug}`,
                    lastModified: new Date(article.publishedAt),
                    changeFrequency: "monthly",
                    priority: 0.6,
                });
            }
        } catch {
            // CMS might be unreachable during build
        }
    }

    return [...staticEntries, ...articleEntries];
}

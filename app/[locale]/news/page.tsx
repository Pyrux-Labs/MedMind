import type { Metadata } from "next";
import { fetchArticles } from "@/lib/api/articles";
import Card from "@/components/News/Card";
import Pagination from "@/components/News/Pagination";
import Title from "@/components/common/Title";
import { getTranslations, setRequestLocale } from "next-intl/server";

const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.medmind.com.ar";
const PAGE_SIZE = 6;

type Params = Promise<{ locale: string }>;
type SearchParams = Promise<{ page?: string }>;

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta.news" });
    const otherLocale = locale === "es" ? "en" : "es";
    return {
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: `${BASE_URL}/${locale}/news`,
            languages: { [otherLocale]: `${BASE_URL}/${otherLocale}/news` },
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: `${BASE_URL}/${locale}/news`,
        },
    };
}

export default async function NewsPage({
    params,
    searchParams,
}: {
    params: Params;
    searchParams: SearchParams;
}) {
    const { locale } = await params;
    const { page: pageParam } = await searchParams;
    setRequestLocale(locale);

    const page = Number(pageParam) > 0 ? Number(pageParam) : 1;
    const { data: articles, meta } = await fetchArticles(
        locale,
        page,
        PAGE_SIZE,
    );
    const t = await getTranslations("news");

    return (
        <div>
            <Title text={t("title")} align="left" noMargin={false} />
            <div className="grid grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 sm:gap-6 lg:gap-10">
                {articles.map((article) => (
                    <Card key={article.id} article={article} locale={locale} />
                ))}
            </div>
            <Pagination
                page={meta.pagination.page}
                pageCount={meta.pagination.pageCount}
            />
        </div>
    );
}

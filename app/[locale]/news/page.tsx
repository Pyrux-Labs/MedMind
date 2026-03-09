import { fetchArticles } from "@/lib/api/articles";
import Card from "@/components/News/Card";
import Pagination from "@/components/News/Pagination";
import Title from "@/components/common/Title";
import { getTranslations, setRequestLocale } from "next-intl/server";

const PAGE_SIZE = 6;

type Params = Promise<{ locale: string }>;
type SearchParams = Promise<{ page?: string }>;

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
        <div className="container mx-auto px-4 py-8">
            <Title text={t("title")} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

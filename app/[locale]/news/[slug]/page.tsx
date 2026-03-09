import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { fetchArticleBySlug } from "@/lib/api/articles";
import { SyncArticleLocaleMap } from "@/components/common/ArticleLocaleContext";
import Top from "@/components/News/Top";
import Content from "@/components/News/Content";
import Footer from "@/components/News/Footer";

type Params = Promise<{ locale: string; slug: string }>;

export default async function ArticlePage({ params }: { params: Params }) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const article = await fetchArticleBySlug(slug, locale);

    if (!article) {
        notFound();
    }

    const slugMap: Record<string, string> = { [locale]: article.slug };
    for (const loc of article.localizations ?? []) {
        slugMap[loc.locale] = loc.slug;
    }

    return (
        <>
            <SyncArticleLocaleMap slugMap={slugMap} />
            <Top article={article} locale={locale} />
            <Content article={article} />
            <Footer article={article} />
        </>
    );
}

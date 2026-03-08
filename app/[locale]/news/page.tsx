import Card from "@/components/News/Card";
import Pagination from "@/components/News/Pagination";
import Title from "@/components/common/Title";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Params = Promise<{ locale: string }>;

export default async function NewsPage({ params }: { params: Params }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("news");

    return (
        <div>
            <Title text={t("title")} />
            <Card />
            <Pagination />
        </div>
    );
}

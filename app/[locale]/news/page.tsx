import { setRequestLocale } from "next-intl/server";
import Card from "@/components/News/Card";
import Pagination from "@/components/News/Pagination";
import Title from "@/components/common/Title";

type Params = Promise<{ locale: string }>;

export default async function NewsPage({ params }: { params: Params }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div>
            <Title />
            <Card />
            <Pagination />
        </div>
    );
}

import { setRequestLocale } from "next-intl/server";
import Content from "@/components/News/Content";
import Footer from "@/components/News/Footer";
import Top from "@/components/News/Top";

type Params = Promise<{ locale: string }>;

export default async function page({ params }: { params: Params }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div>
            <Top />
            <Content />
            <Footer />
        </div>
    );
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CardsContainer from "@/components/AboutUs/CardsContainer";
import Content from "@/components/AboutUs/Content";
import Top from "@/components/AboutUs/Top";
import Title from "@/components/common/Title";

const BASE_URL = "https://www.medmindls.com";
type Params = Promise<{ locale: string }>;

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta.about" });
    const otherLocale = locale === "es" ? "en" : "es";
    return {
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: `${BASE_URL}/${locale}/about`,
            languages: { [otherLocale]: `${BASE_URL}/${otherLocale}/about` },
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: `${BASE_URL}/${locale}/about`,
        },
    };
}

export default async function AboutPage({ params }: { params: Params }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("about.founders");

    return (
        <div>
            <Top />
            <CardsContainer />
            <Title text={t("title")} align="center" noMargin={false} />
            <Content />
        </div>
    );
}

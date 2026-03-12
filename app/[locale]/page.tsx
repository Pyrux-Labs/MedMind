import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Contact from "@/components/Landing/Contact";
import Content from "@/components/Landing/Content";
import Service from "@/components/Landing/Service";
import Top from "@/components/Landing/Top";
import Values from "@/components/Landing/Values";

const BASE_URL = "https://www.medmindls.com";
type Params = Promise<{ locale: string }>;

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta.home" });
    const otherLocale = locale === "es" ? "en" : "es";
    return {
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: `${BASE_URL}/${locale}`,
            languages: { [otherLocale]: `${BASE_URL}/${otherLocale}` },
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: `${BASE_URL}/${locale}`,
        },
    };
}

export default async function Home({ params }: { params: Params }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div>
            <Top />
            <Content
                namespace="health"
                imageSrc="/landing/content/health.jpg"
            />
            <Content
                namespace="education"
                imageSrc="/landing/content/education.jpg"
                imageLeft
            />
            <Service />
            <Values />
            <Contact />
        </div>
    );
}

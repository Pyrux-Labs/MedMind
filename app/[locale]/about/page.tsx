import { getTranslations, setRequestLocale } from "next-intl/server";
import CardsContainer from "@/components/AbautUs/CardsContainer";
import Content from "@/components/AbautUs/Content";
import Top from "@/components/AbautUs/Top";
import Title from "@/components/common/Title";

type Params = Promise<{ locale: string }>;

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

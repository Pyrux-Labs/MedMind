import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Title from "@/components/common/Title";
import Footer from "@/components/ContactUs/Footer";
import Form from "@/components/ContactUs/Form";

type Params = Promise<{ locale: string }>;

export default async function ContactPage({ params }: { params: Params }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("contact");

    return (
        <div>
            <Title
                text={t("title")}
                subtitle={t("subtitle")}
                noMargin={false}
            />
            <Form locale={locale} />
            <Footer />
        </div>
    );
}

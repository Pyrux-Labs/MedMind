import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Title from "@/components/common/Title";
import Footer from "@/components/ContactUs/Footer";
import Form from "@/components/ContactUs/Form";

const BASE_URL = "https://www.medmindls.com";
type Params = Promise<{ locale: string }>;

export async function generateMetadata({
	params,
}: {
	params: Params;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "meta.contact" });
	const otherLocale = locale === "es" ? "en" : "es";
	return {
		title: t("title"),
		description: t("description"),
		alternates: {
			canonical: `${BASE_URL}/${locale}/contact`,
			languages: { [otherLocale]: `${BASE_URL}/${otherLocale}/contact` },
		},
		openGraph: {
			title: t("title"),
			description: t("description"),
			url: `${BASE_URL}/${locale}/contact`,
		},
	};
}

export default async function ContactPage({ params }: { params: Params }) {
	const { locale } = await params;
	setRequestLocale(locale);

	const t = await getTranslations("contact");

	return (
		<div>
			<Title text={t("title")} subtitle={t("subtitle")} noMargin={false} />
			<Form locale={locale} />
			<Footer />
		</div>
	);
}

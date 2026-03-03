import { setRequestLocale } from "next-intl/server";
import CardsContainer from "@/components/AbautUs/CardsContainer";
import Content from "@/components/AbautUs/Content";
import Top from "@/components/AbautUs/Top";

type Params = Promise<{ locale: string }>;

export default async function AboutPage({ params }: { params: Params }) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<div>
			<Top />
			<CardsContainer />
			<Content />
		</div>
	);
}

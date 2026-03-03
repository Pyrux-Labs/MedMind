"use client";

import { useTranslations } from "next-intl";
import Card from "./Card";

const CardsContainer = () => {
	const t = useTranslations("about");

	return (
		<div>
			<Card
				title={t("personality.title")}
				description={t("personality.description")}
			/>
			<Card title={t("purpose.title")} description={t("purpose.description")} />
			<Card title={t("mission.title")} description={t("mission.description")} />
			<Card title={t("vision.title")} description={t("vision.description")} />
		</div>
	);
};

export default CardsContainer;

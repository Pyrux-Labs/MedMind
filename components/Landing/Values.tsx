"use client";

import { useTranslations } from "next-intl";

const Values = () => {
	const t = useTranslations("values");

	return (
		<div>
			<h2>{t("title")}</h2>
			<p>{t("subtitle")}</p>
			<p>{t("description")}</p>
			<div>
				<h3>{t("empathy.title")}</h3>
				<p>{t("empathy.description")}</p>
			</div>
			<div>
				<h3>{t("clarity.title")}</h3>
				<p>{t("clarity.description")}</p>
			</div>
		</div>
	);
};

export default Values;

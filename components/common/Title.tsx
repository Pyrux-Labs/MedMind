"use client";

import { useTranslations } from "next-intl";

const Title = () => {
	const t = useTranslations("contact");

	return (
		<div>
			<h1>{t("title")}</h1>
			<p>{t("subtitle")}</p>
		</div>
	);
};

export default Title;

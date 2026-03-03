"use client";

import { useTranslations } from "next-intl";

const Top = () => {
	const t = useTranslations("about");

	return (
		<div>
			<h1>{t("title")}</h1>
			<p>{t("intro.description")}</p>
			<p>{t("intro.purpose")}</p>
		</div>
	);
};

export default Top;

"use client";

import { useTranslations } from "next-intl";

const Top = () => {
	const t = useTranslations("news");

	return (
		<div>
			<h1>{t("title")}</h1>
		</div>
	);
};

export default Top;

"use client";

import { useTranslations } from "next-intl";
import MainButton from "../ui/MainButton";

const Top = () => {
	const t = useTranslations("hero");

	return (
		<div>
			<h1>{t("title")}</h1>
			<p>{t("subtitle")}</p>
			<MainButton label={t("cta")} />
		</div>
	);
};

export default Top;

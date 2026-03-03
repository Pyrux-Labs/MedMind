"use client";

import { useTranslations } from "next-intl";
import Founder from "./Founder";

const Content = () => {
	const t = useTranslations("about.founders");

	return (
		<div>
			<h2>{t("title")}</h2>
			<Founder name={t("guillermina.name")} bio={t("guillermina.bio")} />
			<Founder name={t("lucia.name")} bio={t("lucia.bio")} />
		</div>
	);
};

export default Content;

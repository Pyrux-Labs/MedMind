"use client";

import { useTranslations } from "next-intl";

const Footer = () => {
	const t = useTranslations("contact.info");

	return (
		<div>
			<h3>{t("title")}</h3>
			<p>{t("email")}</p>
			<p>{t("location")}</p>
			<p>{t("country")}</p>
		</div>
	);
};

export default Footer;

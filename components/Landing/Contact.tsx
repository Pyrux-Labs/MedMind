"use client";

import { useTranslations } from "next-intl";
import Button from "../ui/MainButton";

const Contact = () => {
	const t = useTranslations("callToAction");

	return (
		<div>
			<p>{t("question")}</p>
			<Button label={t("cta")} />
		</div>
	);
};

export default Contact;

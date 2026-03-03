"use client";

import { useTranslations } from "next-intl";

const Content = () => {
	const t = useTranslations("news");

	return <div>{t("designOk")}</div>;
};

export default Content;

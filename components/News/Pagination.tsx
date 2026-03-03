"use client";

import { useTranslations } from "next-intl";

const Pagination = () => {
	const t = useTranslations("news.pagination");

	return (
		<div>
			<button>{t("next")}</button>
		</div>
	);
};

export default Pagination;

"use client";

import { useTranslations } from "next-intl";

const Service = () => {
	const t = useTranslations("services");

	return (
		<div>
			<h2>{t("title")}</h2>
			<ul>
				{(t.raw("items") as string[]).map((item: string, index: number) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</div>
	);
};

export default Service;

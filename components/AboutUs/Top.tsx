"use client";

import { useTranslations } from "next-intl";

const Top = () => {
	const t = useTranslations("about");

	return (
		<header className="-mx-5 md:-mx-8 lg:-mx-[8.7%] xl:-mx-6 h-[60vh] md:h-[70vh] lg:h-180 bg-about-overlay bg-cover bg-center flex flex-col items-center justify-center gap-5 px-6">
			<h1 className="hero-title main-title text-center">{t("title")}</h1>
			<h2 className="hero-subtitle subtitle mx-4 md:mx-16 lg:mx-37 text-center">
				{t("intro.description")}
				<br />
				{t("intro.purpose")}
			</h2>
		</header>
	);
};

export default Top;

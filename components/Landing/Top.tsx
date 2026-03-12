"use client";

import { useTranslations } from "next-intl";
import MainButton from "../common/MainButton";

const Top = () => {
    const t = useTranslations("hero");

    return (
        <header className="-mx-5 md:-mx-8 lg:-mx-[8.7%] xl:-mx-6 2xl:-mx-6 h-[80vh] md:h-screen bg-landing-overlay bg-cover bg-center flex flex-col items-center justify-center px-6">
            <h1 className="hero-title main-title mx-4 md:mx-20 lg:mx-40 xl:mx-71 text-center">
                {t("title")}
            </h1>
            <h2 className="hero-subtitle subtitle my-8 md:my-15 text-center">
                {t("subtitle")}
            </h2>
            <div className="hero-cta">
                <MainButton label={t("cta")} />
            </div>
        </header>
    );
};

export default Top;

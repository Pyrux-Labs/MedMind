"use client";

import { useTranslations } from "next-intl";
import MainButton from "../common/MainButton";

const Top = () => {
    const t = useTranslations("hero");

    return (
        <header className="-mx-[12.5%] h-screen bg-landing-overlay bg-cover bg-center flex flex-col items-center justify-center">
            <h1 className="main-title mx-71 text-center">{t("title")}</h1>
            <h2 className="subtitle my-15">{t("subtitle")}</h2>
            <MainButton label={t("cta")} />
        </header>
    );
};

export default Top;

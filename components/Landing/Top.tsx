"use client";

import { useTranslations } from "next-intl";
import MainButton from "../ui/MainButton";

const Top = () => {
    const t = useTranslations("hero");

    return (
        <header className="w-screen -mx-30 h-screen bg-landing-overlay bg-cover bg-center flex flex-col items-center justify-center">
            <h1 className="main-title">{t("title")}</h1>
            <h2 className="subtitle">{t("subtitle")}</h2>
            <MainButton label={t("cta")} />
        </header>
    );
};

export default Top;

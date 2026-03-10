"use client";

import { useTranslations } from "next-intl";

const Top = () => {
    const t = useTranslations("about");

    return (
        <header className="-mx-[12.5%] h-140 bg-abaut-overlay bg-cover bg-center flex flex-col items-center justify-center gap-5">
            <h1 className="main-title">{t("title")}</h1>
            <h2 className="subtitle mx-37 text-center">
                {t("intro.description")}
                <br />
                {t("intro.purpose")}
            </h2>
        </header>
    );
};

export default Top;

"use client";

import { useTranslations } from "next-intl";
import Card from "./Card";

const CardsContainer = () => {
    const t = useTranslations("about");

    return (
        <div className="my-30 justify-items-center flex flex-col gap-11">
            <h2 className="main-title text-center">{t("personality.title")}</h2>
            <p className="text text-center">{t("personality.description")}</p>
            <div>
                <Card
                    title={t("purpose.title")}
                    description={t("purpose.description")}
                />
                <Card
                    title={t("mission.title")}
                    description={t("mission.description")}
                />
                <Card
                    title={t("vision.title")}
                    description={t("vision.description")}
                />
            </div>
        </div>
    );
};

export default CardsContainer;

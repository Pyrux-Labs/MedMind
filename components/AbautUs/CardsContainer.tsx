"use client";

import { useTranslations } from "next-intl";
import Card from "./Card";

const CardsContainer = () => {
    const t = useTranslations("about");

    return (
        <div className="my-30 justify-items-center flex flex-col gap-11">
            <h2 className="main-title text-center">{t("personality.title")}</h2>
            <p className="text text-center">{t("personality.description")}</p>
            <div className="flex justify-center gap-12">
                <Card
                    title={t("purpose.title")}
                    description={t("purpose.description")}
                    imageSrc={"/abaut/cards/purpose.svg"}
                />
                <Card
                    title={t("mission.title")}
                    description={t("mission.description")}
                    imageSrc={"/abaut/cards/mission.svg"}
                />
                <Card
                    title={t("vision.title")}
                    description={t("vision.description")}
                    imageSrc={"/abaut/cards/vision.svg"}
                />
            </div>
        </div>
    );
};

export default CardsContainer;

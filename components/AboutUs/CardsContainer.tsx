"use client";

import { useTranslations } from "next-intl";
import Card from "./Card";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CardsContainer = () => {
    const t = useTranslations("about");
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    return (
        <div
            ref={ref}
            className="my-16 lg:my-30 justify-items-center flex flex-col gap-8 lg:gap-11"
        >
            <h2 className="main-title text-center">{t("personality.title")}</h2>
            <p className="text text-center">{t("personality.description")}</p>
            <div className="flex flex-col md:flex-row justify-center gap-6 lg:gap-12">
                <div
                    className={`scale-in reveal-delay-1 ${isVisible ? "revealed" : ""}`}
                >
                    <Card
                        title={t("purpose.title")}
                        description={t("purpose.description")}
                        imageSrc={"/about/cards/purpose.svg"}
                    />
                </div>
                <div
                    className={`scale-in reveal-delay-2 ${isVisible ? "revealed" : ""}`}
                >
                    <Card
                        title={t("mission.title")}
                        description={t("mission.description")}
                        imageSrc={"/about/cards/mission.svg"}
                    />
                </div>
                <div
                    className={`scale-in reveal-delay-3 ${isVisible ? "revealed" : ""}`}
                >
                    <Card
                        title={t("vision.title")}
                        description={t("vision.description")}
                        imageSrc={"/about/cards/vision.svg"}
                    />
                </div>
            </div>
        </div>
    );
};

export default CardsContainer;

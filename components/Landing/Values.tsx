"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const VALUES_KEYS = ["empathy", "clarity"] as const;

const Values = () => {
    const t = useTranslations("values");
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    const valuesCards = VALUES_KEYS.map((key, index) => {
        const iconIndex = (index % 2) + 1;
        return (
            <div
                key={key}
                className="group w-full h-auto min-h-20 lg:h-29.5 bg-values-card-bg hover:bg-values-card-bg-hoover border border-secondary-bg hover:border-secondary-color rounded-2xl p-4 pb-5 flex gap-4 lg:gap-5 transition-colors duration-200"
            >
                <div className="relative w-8 h-8 lg:w-10 lg:h-10 shrink-0">
                    <Image
                        src={`/landing/values/icon-${iconIndex}.svg`}
                        alt=""
                        fill
                        className="absolute inset-0 object-contain transition-opacity duration-300 ease-in-out will-change-opacity opacity-100 group-hover:opacity-0"
                    />
                    <Image
                        src={`/landing/values/icon-${iconIndex}-hover.svg`}
                        alt=""
                        fill
                        priority
                        className="absolute inset-0 object-contain transition-opacity duration-300 ease-in-out will-change-opacity opacity-0 group-hover:opacity-100"
                    />
                </div>
                <div>
                    <h2 className="subtitle">{t(`${key}.title`)}</h2>
                    <p className="text">{t(`${key}.description`)}</p>
                </div>
            </div>
        );
    });

    const imagesBlock = (
        <div
            className={`w-full lg:w-1/2 flex h-64 sm:h-80 lg:h-full gap-4 slide-in-right ${isVisible ? "revealed" : ""}`}
        >
            {["items-start", "items-end"].map((align, index) => (
                <div
                    key={index}
                    className={`w-1/2 h-full flex py-2 lg:py-5 ${align}`}
                >
                    <Image
                        src={`/landing/values/image-${index + 1}.jpg`}
                        alt={`values image ${index + 1}`}
                        height={368}
                        width={276}
                        className="rounded-2xl shadow-custom object-cover h-full max-h-48 sm:max-h-64 lg:max-h-92"
                        sizes="(max-width: 768px) 45vw, (max-width: 1024px) 40vw, 276px"
                    />
                </div>
            ))}
        </div>
    );

    return (
        <div
            ref={ref}
            className="my-16 lg:my-30 flex flex-col lg:flex-row lg:h-120 gap-8 lg:gap-12 justify-between"
        >
            {/* Mobile: title - images - description - values (vertical) */}
            <div className="flex flex-col gap-6 lg:hidden">
                <div
                    className={`slide-in-left ${isVisible ? "revealed" : ""}`}
                >
                    <h2 className="main-title">{t("title")}</h2>
                </div>
                {imagesBlock}
                <div
                    className={`slide-in-left ${isVisible ? "revealed" : ""}`}
                >
                    <p className="text my-2">
                        {t("subtitle")}
                        <br />
                        {t("description")}
                    </p>
                </div>
                {valuesCards}
            </div>
            {/* Desktop: original side-by-side layout */}
            <div
                className={`hidden lg:flex w-1/2 flex-col justify-center gap-6 slide-in-left ${isVisible ? "revealed" : ""}`}
            >
                <h2 className="main-title">{t("title")}</h2>
                <p className="text my-3.5">
                    {t("subtitle")}
                    <br />
                    {t("description")}
                </p>
                {valuesCards}
            </div>
            <div className="hidden lg:contents">{imagesBlock}</div>
        </div>
    );
};

export default Values;

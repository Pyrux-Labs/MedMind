"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const VALUES_KEYS = ["empathy", "clarity"] as const;

const Values = () => {
    const t = useTranslations("values");

    return (
        <div className="my-30 flex h-120 gap-12 justify-between">
            <div className="w-1/2 flex flex-col justify-center h-full gap-6">
                <h1 className="main-title">{t("title")}</h1>
                <p className="text my-3.5">
                    {t("subtitle")}
                    <br />
                    {t("description")}
                </p>
                {VALUES_KEYS.map((key, index) => {
                    const iconIndex = (index % 2) + 1;
                    return (
                        <div
                            key={key}
                            className="group w-full h-29.5 bg-values-card-bg hover:bg-values-card-bg-hoover border border-secondary-bg hover:border-secondary-color rounded-2xl p-4 flex gap-5 transition-colors duration-200"
                        >
                            <div className="relative w-10 h-10 shrink-0">
                                <Image
                                    src={`/landing_values_${iconIndex}.svg`}
                                    alt={`${key} icon`}
                                    fill
                                    className="transition-opacity duration-200 group-hover:opacity-0"
                                />
                                <Image
                                    src={`/landing_values_${iconIndex}:hoover.svg`}
                                    alt={`${key} icon hover`}
                                    fill
                                    className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                />
                            </div>
                            <div>
                                <h2 className="subtitle">
                                    {t(`${key}.title`)}
                                </h2>
                                <p className="text">
                                    {t(`${key}.description`)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="w-1/2 flex h-full gap-4">
                {["items-start", "items-end"].map((align, index) => (
                    <div
                        key={index}
                        className={`w-1/2 h-full flex py-5 ${align}`}
                    >
                        <Image
                            src={`/landing_values_${index + 1}.jpg`}
                            alt={`values image ${index + 1}`}
                            height={368}
                            width={276}
                            className="rounded-2xl shadow-custom object-cover h-92"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Values;

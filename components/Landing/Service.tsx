"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const Service = () => {
    const t = useTranslations("services");

    return (
        <div className="my-35 flex h-136 justify-between">
            <div className="flex flex-col justify-center h-full">
                <h1 className="main-title mb-8">{t("title")}</h1>
                <div className="w-180 bg-white rounded-xl h-112 p-3 shadow-custom">
                    {(t.raw("items") as string[]).map(
                        (item: string, index: number) => {
                            const iconSrc = `/landing_services_${(index % 5) + 1}.svg`;

                            return (
                                <div
                                    key={index}
                                    className="p-3 flex border-b gap-5 h-21 items-center border-secondary-color last:border-b-0"
                                >
                                    <Image
                                        src={iconSrc}
                                        alt={`landing_services_${(index % 5) + 1}`}
                                        height={44}
                                        width={44}
                                    />
                                    <p className="text">{item}</p>
                                </div>
                            );
                        },
                    )}
                </div>
            </div>
            <div className="relative w-78.5 shrink-0">
                <Image
                    src="/landing_services.jpg"
                    alt="landing_services"
                    height={314}
                    width={560}
                    className="object-cover rounded-2xl shadow-custom"
                />
            </div>
        </div>
    );
};

export default Service;

"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const Service = () => {
    const t = useTranslations("services");

    return (
        <div className="my-30 flex h-136 gap-12 justify-between">
            <div className="flex flex-col justify-center h-full w-2/3">
                <h1 className="main-title mb-8">{t("title")}</h1>
                <div className="bg-white rounded-xl p-3 shadow-custom w-fit">
                    {(t.raw("items") as string[]).map(
                        (item: string, index: number) => {
                            const iconSrc = `/landing/services/icon-${(index % 5) + 1}.svg`;

                            return (
                                <div
                                    key={index}
                                    className="p-3 flex border-b gap-5 h-21 items-center border-secondary-color last:border-b-0"
                                >
                                    <Image
                                        src={iconSrc}
                                        alt={`service icon ${(index % 5) + 1}`}
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
            <div className="w-1/3 justify-center flex">
                <Image
                    src="/landing/services/bg.jpg"
                    alt="services"
                    height={314}
                    width={560}
                    className="object-cover rounded-2xl shadow-custom relative w-78.5 shrink-0"
                />
            </div>
        </div>
    );
};

export default Service;

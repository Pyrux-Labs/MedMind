"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Service = () => {
    const t = useTranslations("services");
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    return (
        <div
            ref={ref}
            className="my-16 lg:my-30 flex flex-col lg:flex-row lg:h-136 gap-8 lg:gap-12 justify-between"
        >
            <div
                className={`flex flex-col justify-center w-full lg:w-2/3 slide-in-left ${isVisible ? "revealed" : ""}`}
            >
                <h2 className="main-title mb-6 lg:mb-8">{t("title")}</h2>
                <div className="bg-white rounded-xl p-3 shadow-custom w-full lg:w-fit">
                    {(t.raw("items") as string[]).map(
                        (item: string, index: number) => {
                            const iconSrc = `/landing/services/icon-${(index % 5) + 1}.svg`;

                            return (
                                <div
                                    key={index}
                                    className="p-3 flex border-b gap-4 lg:gap-5 h-16 lg:h-21 items-center border-secondary-color last:border-b-0"
                                >
                                    <Image
                                        src={iconSrc}
                                        alt=""
                                        height={44}
                                        width={44}
                                        className="w-8 h-8 lg:w-11 lg:h-11 shrink-0"
                                    />
                                    <p className="text">{item}</p>
                                </div>
                            );
                        },
                    )}
                </div>
            </div>
            <div
                className={`hidden lg:flex w-1/3 justify-center slide-in-right ${isVisible ? "revealed" : ""}`}
            >
                <Image
                    src="/landing/services/bg.jpg"
                    alt="services"
                    height={314}
                    width={560}
                    sizes="(max-width: 1024px) 0px, 314px"
                    className="object-cover rounded-2xl shadow-custom relative w-78.5 shrink-0"
                />
            </div>
        </div>
    );
};

export default Service;

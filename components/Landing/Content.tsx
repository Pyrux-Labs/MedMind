"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type ContentProps = {
    namespace: string;
    imageSrc: string;
    imageLeft?: boolean;
};

const Content = ({ namespace, imageSrc, imageLeft = false }: ContentProps) => {
    const t = useTranslations(namespace);
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    const textBlock = (
        <div
            className={`flex flex-col justify-center ${imageLeft ? "slide-in-right" : "slide-in-left"} ${isVisible ? "revealed" : ""}`}
        >
            <h2 className="main-title">{t("title")}</h2>
            <p className="text py-6 lg:py-11">{t("description")}</p>
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-custom w-full lg:w-fit lg:min-w-120">
                {(t.raw("items") as string[]).map(
                    (item: string, index: number) => (
                        <div
                            key={index}
                            className="flex border-b gap-3 lg:gap-4.5 h-10 lg:h-12 items-center border-secondary-color last:border-b-0"
                        >
                            <Image
                                src="/landing/content/check.svg"
                                alt=""
                                height={19.5}
                                width={19.5}
                                className="shrink-0"
                            />
                            <p className="text">{item}</p>
                        </div>
                    ),
                )}
            </div>
        </div>
    );

    const imageBlock = (
        <div
            className={`relative w-full h-64 md:h-80 lg:w-136 lg:h-auto shrink-0 ${imageLeft ? "slide-in-left" : "slide-in-right"} ${isVisible ? "revealed" : ""}`}
        >
            <Image
                src={imageSrc}
                alt={t("title")}
                fill
                sizes="(max-width: 1024px) 100vw, 544px"
                className="object-cover rounded-2xl shadow-custom"
            />
        </div>
    );

    return (
        <div
            ref={ref}
            className="my-16 lg:my-30 flex flex-col lg:flex-row lg:h-136 gap-8 lg:gap-12 justify-between"
        >
            {imageLeft ? imageBlock : textBlock}
            {imageLeft ? textBlock : imageBlock}
        </div>
    );
};

export default Content;

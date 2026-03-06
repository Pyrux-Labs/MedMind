"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

type ContentProps = {
    namespace: string;
    imageSrc: string;
    imageLeft?: boolean;
};

const Content = ({ namespace, imageSrc, imageLeft = false }: ContentProps) => {
    const t = useTranslations(namespace);

    const textBlock = (
        <div className="flex flex-col justify-center h-full">
            <h1 className="main-title">{t("title")}</h1>
            <p className="text py-11">{t("description")}</p>
            <div className="bg-white rounded-xl p-6 shadow-custom">
                {(t.raw("items") as string[]).map(
                    (item: string, index: number) => (
                        <div
                            key={index}
                            className="flex border-b gap-4.5 h-12 items-center border-secondary-color last:border-b-0"
                        >
                            <Image
                                src="/landing_content_check.svg"
                                alt="landing_content_check"
                                height={19.5}
                                width={19.5}
                            />
                            <p className="text">{item}</p>
                        </div>
                    ),
                )}
            </div>
        </div>
    );

    const imageBlock = (
        <div className="relative w-136 shrink-0">
            <Image
                src={imageSrc}
                alt={namespace}
                fill
                sizes="544px"
                className="object-cover rounded-2xl shadow-custom"
            />
        </div>
    );

    return (
        <div className="my-30 flex h-136 gap-12 justify-between">
            {imageLeft ? imageBlock : textBlock}
            {imageLeft ? textBlock : imageBlock}
        </div>
    );
};

export default Content;

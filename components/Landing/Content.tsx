"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const Content = () => {
    const tHealth = useTranslations("health");

    return (
        <div className="my-19 flex h-136 gap-12">
            <div className="my-5">
                <h1 className="main-title">{tHealth("title")}</h1>
                <p className="text py-11">{tHealth("description")}</p>
                <div className="w-136 bg-white rounded-xl h-64 p-6 shadow-custom">
                    {(tHealth.raw("items") as string[]).map(
                        (item: string, index: number) => (
                            <div
                                key={index}
                                className="flex border-b gap-4.5 w-full h-12 items-center border-secondary-color last:border-b-0"
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
            <div className="relative w-136 shrink-0">
                <Image
                    src="/landing_content_education.jpg"
                    alt="landing_content_education"
                    fill
                    className="object-cover rounded-2xl shadow-custom"
                />
            </div>
        </div>
    );
};

export default Content;

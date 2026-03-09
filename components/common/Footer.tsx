"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

function Footer() {
    const t = useTranslations("footer");

    return (
        <div className="mt-30 px-[10%] pt-4 border-secondary-color border-t">
            <div className="flex gap-87">
                <div className="flex flex-col gap-2">
                    <Image
                        src="/icons/logo.svg"
                        alt="MedMind logo"
                        width={235}
                        height={81}
                        className="-ml-3"
                    />
                    <p className="text text-footer-labels!">{t("tagline")}</p>
                    <div className="flex gap-4">
                        <Image
                            src="/social/linkedin.svg"
                            alt="LinkedIn"
                            height={28}
                            width={28}
                        />
                        <Image
                            src="/social/instagram.svg"
                            alt="Instagram"
                            height={28}
                            width={28}
                        />
                        <Image
                            src="/social/email.svg"
                            alt="Email"
                            height={28}
                            width={28}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4.5 mr-50">
                    <h2 className="subtitle">{t("sections")}</h2>
                    <label className="label text-footer-labels!">
                        {t("news")}
                    </label>
                    <label className="label text-footer-labels! whitespace-nowrap">
                        {t("about")}
                    </label>
                    <label className="label text-footer-labels!">
                        {t("contact")}
                    </label>
                </div>
            </div>
            <div className="mx-45 py-4 mt-4 border-t flex justify-between border-secondary-bg">
                <p className="label text-footer-labels!">{t("rights")}</p>
                <p className="label text-footer-labels! flex items-center">
                    {t("sponsor")}
                    <a
                        href="https://www.pyrux.com.ar/"
                        className="text-pyrux-gradient ml-1 underline decoration-hsl(20.597, 81%, 52%) underline-offset-2"
                        title="Pyrux"
                    >
                        Pyrux
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Footer;

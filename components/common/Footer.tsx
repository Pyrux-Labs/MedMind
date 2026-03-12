"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import SocialButton from "./SocialButton";

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
                        style={{ height: "auto" }}
                    />
                    <p className="text text-footer-labels!">{t("tagline")}</p>
                    <div className="flex gap-4">
                        <SocialButton
                            src="/social/linkedin.svg"
                            href="https://www.linkedin.com/in/medmind-linguistic-solutions"
                        />
                        <SocialButton
                            src="/social/instagram.svg"
                            href="https://www.instagram.com/medmindls"
                        />
                        <SocialButton
                            src="/social/email.svg"
                            email="info@medmindls.com"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4.5 mr-50">
                    <h2 className="subtitle">{t("sections")}</h2>
                    <Link href="/" className="label text-footer-labels!">
                        {t("home")}
                    </Link>
                    <Link href="/news" className="label text-footer-labels!">
                        {t("news")}
                    </Link>
                    <Link
                        href="/about"
                        className="label text-footer-labels! whitespace-nowrap"
                    >
                        {t("about")}
                    </Link>
                    <Link href="/contact" className="label text-footer-labels!">
                        {t("contact")}
                    </Link>
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

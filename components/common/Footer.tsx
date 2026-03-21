"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import SocialButton from "./SocialButton";

function Footer() {
    const t = useTranslations("footer");

    return (
        <div className="mt-16 md:mt-30 px-5 md:px-8 lg:px-[10%] pt-4 border-secondary-color border-t">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24">
                <div className="flex flex-col gap-4 items-center md:items-start">
                    <Image
                        src="/icons/logo.svg"
                        alt="MedMind logo"
                        width={235}
                        height={81}
                        className="md:-ml-3"
                        style={{ height: "auto" }}
                    />
                    <p className="text text-footer-labels! text-center md:text-left">
                        {t("tagline")}
                    </p>
                    <div className="flex gap-4">
                        <SocialButton
                            src="/social/linkedin.svg"
                            href="https://www.linkedin.com/company/medmind-linguistic-solutions"
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
                <div className="hidden md:flex flex-col gap-4.5 items-center md:items-start">
                    <h2 className="subtitle">{t("sections")}</h2>
                    <Link
                        href="/"
                        className="label text-footer-labels! hover:opacity-80 transition-opacity"
                    >
                        {t("home")}
                    </Link>
                    <Link
                        href="/news"
                        className="label text-footer-labels! hover:opacity-80 transition-opacity"
                    >
                        {t("news")}
                    </Link>
                    <Link
                        href="/about"
                        className="label text-footer-labels! whitespace-nowrap hover:opacity-80 transition-opacity"
                    >
                        {t("about")}
                    </Link>
                    <Link
                        href="/contact"
                        className="label text-footer-labels! hover:opacity-80 transition-opacity"
                    >
                        {t("contact")}
                    </Link>
                </div>
            </div>
            <div className="py-4 mt-4 border-t flex flex-col md:flex-row justify-between items-center gap-2 border-secondary-bg">
                <p className="label text-footer-labels!">{t("rights")}</p>
                <p className="label text-footer-labels! flex items-center">
                    {t("sponsor")}
                    <a
                        href="https://www.pyrux.com.ar/"
                        target="_blank"
                        rel="noopener noreferrer"
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

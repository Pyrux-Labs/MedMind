"use client";

import { useTranslations } from "next-intl";
import LanguageDropdown from "./LanguageDropdown";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
    const t = useTranslations("nav");

    return (
        <aside className="w-full h-15 flex items-center justify-between px-13 border border-secondary-bg shadow-custom">
            <Link href="/">
                <Image
                    src="/icons/logo.svg"
                    alt="MedMind logo"
                    width={177}
                    height={62}
                    style={{ height: "auto" }}
                />
            </Link>
            <div className="flex items-center gap-8 w-fit h-full">
                <nav className="flex w-fit h-full justify-between gap-17 label items-center">
                    <Link href="/">{t("home").toUpperCase()}</Link>
                    <Link href="/news">{t("news").toUpperCase()}</Link>
                    <Link href="/about">{t("about").toUpperCase()}</Link>
                    <Link href="/contact">{t("contact").toUpperCase()}</Link>
                    <LanguageDropdown />
                </nav>
            </div>
        </aside>
    );
};

export default NavBar;

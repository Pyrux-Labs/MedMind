"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageDropdown from "../ui/LanguageDropdown";
import Image from "next/image";

const NavBar = () => {
    const t = useTranslations("nav");

    return (
        <aside className="w-full h-1/16 flex items-center justify-between px-12">
            <Image
                src="/mainLogo.svg"
                alt="mainLogo"
                width={200}
                height={200}
            />
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

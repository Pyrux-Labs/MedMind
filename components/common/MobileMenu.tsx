"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageDropdown from "./LanguageDropdown";

interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
}

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
    const t = useTranslations("nav");

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            />
            {/* Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-72 bg-main-bg z-50 shadow-custom transform transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-end p-5">
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center cursor-pointer"
                        aria-label="Close menu"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-main-color"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <nav className="flex flex-col items-center gap-8 mt-8">
                    <Link href="/" onClick={onClose} className="label text-lg">
                        {t("home").toUpperCase()}
                    </Link>
                    <Link
                        href="/news"
                        onClick={onClose}
                        className="label text-lg"
                    >
                        {t("news").toUpperCase()}
                    </Link>
                    <Link
                        href="/about"
                        onClick={onClose}
                        className="label text-lg"
                    >
                        {t("about").toUpperCase()}
                    </Link>
                    <Link
                        href="/contact"
                        onClick={onClose}
                        className="label text-lg"
                    >
                        {t("contact").toUpperCase()}
                    </Link>
                    <div className="mt-4">
                        <LanguageDropdown />
                    </div>
                </nav>
            </div>
        </>
    );
};

export default MobileMenu;

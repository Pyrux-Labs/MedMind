"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
    const t = useTranslations("notFound");

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
            <h1 className="main-title">404</h1>
            <h2 className="subtitle">{t("title")}</h2>
            <p className="text">{t("description")}</p>
            <Link
                href="/"
                className="mt-4 button w-48 h-12 rounded-full bg-main-color flex items-center justify-center hover:border hover:border-main-color hover:bg-main-bg transition-colors duration-200"
            >
                {t("cta").toUpperCase()}
            </Link>
        </div>
    );
}

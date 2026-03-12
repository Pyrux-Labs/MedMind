"use client";

import { useTranslations } from "next-intl";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const t = useTranslations("error");

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
            <h1 className="main-title">{t("title")}</h1>
            <p className="text">{t("description")}</p>
            <button
                onClick={reset}
                className="mt-4 button w-48 h-12 rounded-full bg-main-color flex items-center justify-center hover:border hover:border-main-color hover:bg-main-bg transition-colors duration-200 cursor-pointer"
            >
                {t("cta").toUpperCase()}
            </button>
        </div>
    );
}

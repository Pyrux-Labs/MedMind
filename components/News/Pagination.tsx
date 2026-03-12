"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface PaginationProps {
    page: number;
    pageCount: number;
}

const Pagination = ({ page, pageCount }: PaginationProps) => {
    const t = useTranslations("news.pagination");

    if (pageCount <= 1) return null;

    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

    return (
        <div className="flex flex-wrap items-center gap-2 md:gap-3 justify-center my-16 md:my-30">
            {page > 1 ? (
                <Link
                    href={`?page=${page - 1}`}
                    className="label transition-colors duration-150 cursor-pointer"
                >
                    {t("prev").toUpperCase()}
                </Link>
            ) : (
                <span className="label opacity-70">
                    {t("prev").toUpperCase()}
                </span>
            )}

            {pages.map((p) => (
                <Link
                    key={p}
                    href={`?page=${p}`}
                    aria-current={p === page ? "page" : undefined}
                    className={`label w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 ${
                        p === page
                            ? "bg-secondary-bg"
                            : "hover:bg-secondary-bg/50"
                    }`}
                >
                    {p}
                </Link>
            ))}

            {page < pageCount ? (
                <Link
                    href={`?page=${page + 1}`}
                    className="label transition-colors duration-150 cursor-pointer"
                >
                    {t("next").toUpperCase()}
                </Link>
            ) : (
                <span className="label opacity-70">
                    {t("next").toUpperCase()}
                </span>
            )}
        </div>
    );
};

export default Pagination;

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const Pagination = () => {
    const t = useTranslations("news.pagination");
    const totalPages = 3;
    const [currentPage, setCurrentPage] = useState<number>(1);

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center gap-3 justify-center my-30">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`cursor-pointer label w-9 h-9 rounded-full ${
                        currentPage === page
                            ? "bg-secondary-bg"
                            : "bg-transparent"
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
                className={`label transition-colors duration-150 ${
                    currentPage === totalPages ? "opacity-70" : "cursor-pointer"
                }`}
            >
                {t("next").toUpperCase()}
            </button>
        </div>
    );
};

export default Pagination;

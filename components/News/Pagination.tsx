"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

interface PaginationProps {
	page: number;
	pageCount: number;
}

const Pagination = ({ page, pageCount }: PaginationProps) => {
	const t = useTranslations("news.pagination");

	if (pageCount <= 1) return null;

	return (
		<div className="flex items-center justify-center gap-6 mt-10">
			{page > 1 ? (
				<Link
					href={`?page=${page - 1}`}
					className="px-4 py-2 border rounded hover:bg-gray-100 transition-colors">
					{t("prev")}
				</Link>
			) : (
				<span className="px-4 py-2 border rounded text-gray-300 cursor-not-allowed">
					{t("prev")}
				</span>
			)}

			<span className="text-sm text-gray-500">
				{page} / {pageCount}
			</span>

			{page < pageCount ? (
				<Link
					href={`?page=${page + 1}`}
					className="px-4 py-2 border rounded hover:bg-gray-100 transition-colors">
					{t("next")}
				</Link>
			) : (
				<span className="px-4 py-2 border rounded text-gray-300 cursor-not-allowed">
					{t("next")}
				</span>
			)}
		</div>
	);
};

export default Pagination;

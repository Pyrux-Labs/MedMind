import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getStrapiMediaURL } from "@/lib/strapi";
import type { Article } from "@/types/article";

interface CardProps {
	article: Article;
	locale: string;
}

const Card = ({ article, locale }: CardProps) => {
	const coverUrl = getStrapiMediaURL(
		article.cover?.formats?.medium?.url ||
			article.cover?.formats?.small?.url ||
			article.cover?.url,
	);

	return (
		<Link
			href={`/news/${article.slug}`}
			className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
			<div className="relative w-full aspect-[372/286] bg-gray-200">
				{coverUrl ? (
					<Image
						src={coverUrl}
						alt={article.cover?.alternativeText || article.title}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 372px"
					/>
				) : (
					<div className="flex items-center justify-center h-full">
						<span className="text-gray-400 text-4xl">📰</span>
					</div>
				)}
			</div>

			<div className="p-4">
				<h2 className="text-xl font-semibold mb-2">{article.title}</h2>
				<p className="text-sm text-gray-500">
					{article.author} ·{" "}
					{new Date(article.publishedAt).toLocaleDateString(
						locale === "es" ? "es-AR" : "en-US",
					)}
				</p>
			</div>
		</Link>
	);
};

export default Card;

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
			className="w-93 h-143 shadow-custom rounded-sm flex flex-col gap-4.5 overflow-hidden">
			<div className="relative w-full h-1/2">
				{coverUrl ? (
					<Image
						src={coverUrl}
						alt={article.cover?.alternativeText || article.title}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 372px"
					/>
				) : (
					<div className="flex items-center justify-center h-full bg-gray-200">
						<span className="text-gray-400 text-4xl">📰</span>
					</div>
				)}
			</div>
			<h2 className="mx-5 subtitle line-clamp-2">{article.title}</h2>
			<p className="mx-5 text line-clamp-4">{article.content}</p>
			<p className="mx-5 label">
				{new Date(article.publishedAt).toLocaleDateString(
					locale === "es" ? "es-AR" : "en-US",
					{ day: "numeric", month: "long", year: "numeric" },
				)}
			</p>
		</Link>
	);
};

export default Card;

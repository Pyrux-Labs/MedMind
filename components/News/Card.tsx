import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getStrapiMediaURL } from "@/lib/strapi";
import type { Article } from "@/lib/api/articles";

interface CardProps {
    article: Article;
    locale: string;
}

const Card = ({ article, locale }: CardProps) => {
    const coverUrl = getStrapiMediaURL(article.cover?.url);

    return (
        <Link
            href={`/news/${article.slug}`}
            className="w-full h-auto md:h-143 shadow-custom rounded-sm flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out"
        >
            <div className="relative h-48 md:h-1/2">
                {coverUrl ? (
                    <Image
                        src={coverUrl}
                        alt={article.cover?.alternativeText || article.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gray-200" />
                )}
            </div>
            <h2 className="md:h-19 mx-5 subtitle line-clamp-2">
                {article.title}
            </h2>
            <p className="md:h-30 mx-5 text line-clamp-4">{article.content}</p>
            <p className="mx-5 mb-4 label">
                {new Date(article.publishedAt).toLocaleDateString(
                    locale === "es" ? "es-AR" : "en-US",
                    { day: "numeric", month: "long", year: "numeric" },
                )}
            </p>
        </Link>
    );
};

export default Card;

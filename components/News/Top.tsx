import Image from "next/image";
import { getStrapiMediaURL } from "@/lib/strapi";
import type { Article } from "@/types/article";

interface TopProps {
    article: Article;
    locale: string;
}

const Top = ({ article, locale }: TopProps) => {
    const imageUrl = getStrapiMediaURL(
        article.cover?.formats?.xlarge?.url ||
            article.cover?.formats?.large?.url ||
            article.cover?.url,
    );

    return (
        <div>
            <p>{article.title}</p>
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt={article.cover?.alternativeText || article.title}
                    width={1440}
                    height={303}
                />
            )}
            <p>
                {new Date(article.publishedAt).toLocaleDateString(
                    locale === "es" ? "es-AR" : "en-US",
                )}
            </p>
        </div>
    );
};

export default Top;

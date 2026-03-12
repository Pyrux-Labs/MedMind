import Image from "next/image";
import { getStrapiMediaURL } from "@/lib/strapi";
import type { Article } from "@/lib/api/articles";

interface TopProps {
    article: Article;
    locale: string;
}

const Top = ({ article, locale }: TopProps) => {
    const imageUrl = getStrapiMediaURL(article.cover?.url);

    return (
        <header
            className="-mx-5 md:-mx-8 lg:-mx-[8%] xl:-mx-6 h-48 md:h-70 bg-cover bg-center flex flex-col items-center justify-center gap-4 px-5"
            style={{
                backgroundImage: `var(--image-blur-about-us), url(${imageUrl})`,
            }}
        >
            <h1 className="main-title mx-4 md:mx-20 lg:mx-44 text-center">
                {article.title}
            </h1>
            <h2 className="subtitle">
                {new Date(article.publishedAt).toLocaleDateString(
                    locale === "es" ? "es-AR" : "en-US",
                    { day: "numeric", month: "long", year: "numeric" },
                )}
            </h2>
        </header>
    );
};

export default Top;

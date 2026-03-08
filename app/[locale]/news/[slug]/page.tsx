import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { fetchArticleBySlug } from "@/lib/api/articles";
import { getStrapiMediaURL } from "@/lib/strapi";

type Params = Promise<{ locale: string; slug: string }>;

export default async function ArticlePage({ params }: { params: Params }) {
	const { locale, slug } = await params;
	setRequestLocale(locale);

	const article = await fetchArticleBySlug(slug, locale);

	if (!article) {
		notFound();
	}

	// Prioridad: xlarge → large → original
	const heroUrl = getStrapiMediaURL(
		article.cover?.formats?.xlarge?.url ||
			article.cover?.formats?.large?.url ||
			article.cover?.url,
	);

	return (
		<article className="container mx-auto px-4 py-8 max-w-4xl">
			{heroUrl && (
				<div className="relative w-full aspect-1440/303 mb-8 rounded-lg overflow-hidden">
					<Image
						src={heroUrl}
						alt={article.cover?.alternativeText || article.title}
						fill
						className="object-cover"
						sizes="(max-width: 1440px) 100vw, 1440px"
						priority
					/>
				</div>
			)}

			<header className="mb-8">
				<h1 className="text-4xl font-bold mb-4">{article.title}</h1>
				<div className="text-sm text-gray-500">
					{article.author} ·{" "}
					{new Date(article.publishedAt).toLocaleDateString(
						locale === "es" ? "es-AR" : "en-US",
						{ year: "numeric", month: "long", day: "numeric" },
					)}
				</div>
			</header>

			{/* Content is admin-authored rich text HTML from Strapi CMS */}
			<div
				className="prose prose-lg max-w-none"
				dangerouslySetInnerHTML={{ __html: article.content }}
			/>

			<footer className="mt-12 pt-6 border-t">
				<Link href="/news" className="text-blue-600 hover:underline">
					{locale === "es" ? "← Volver a noticias" : "← Back to news"}
				</Link>
			</footer>
		</article>
	);
}

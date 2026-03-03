import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";

const STRAPI_URL =
	process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

async function getArticle(id: string) {
	const res = await fetch(
		`${STRAPI_URL}/api/articles?filters[documentId][$eq]=${id}&populate=*`,
		{
			cache: "no-store",
		},
	);

	if (!res.ok) {
		return null;
	}

	const data = await res.json();
	return data.data?.[0] || null;
}

type Params = Promise<{ locale: string; id: string }>;

export default async function ArticlePage({ params }: { params: Params }) {
	const { locale, id } = await params;
	setRequestLocale(locale);

	const article = await getArticle(id);

	if (!article) {
		notFound();
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<Link
				href="/news"
				className="text-blue-600 hover:underline mb-4 inline-block">
				{locale === "es" ? "← Volver a noticias" : "← Back to news"}
			</Link>

			<article>
				<h1 className="text-4xl font-bold mb-4">{article.title}</h1>

				<div className="text-gray-500 mb-6">
					{locale === "es" ? "Publicado el " : "Published on "}
					{new Date(article.publishedAt).toLocaleDateString(
						locale === "es" ? "es-AR" : "en-US",
						{
							year: "numeric",
							month: "long",
							day: "numeric",
						},
					)}
				</div>

				<div className="prose prose-lg max-w-none">
					{article.description && (
						<p className="text-xl text-gray-700 mb-6 font-medium">
							{article.description}
						</p>
					)}

					<div className="mt-6 whitespace-pre-wrap">
						{article.content ||
							(locale === "es"
								? "Contenido no disponible"
								: "Content not available")}
					</div>
				</div>
			</article>
		</div>
	);
}

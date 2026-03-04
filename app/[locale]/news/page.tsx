import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const STRAPI_URL =
	process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

async function getArticles() {
	const res = await fetch(`${STRAPI_URL}/api/articles?populate=*`, {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch articles");
	}

	const data = await res.json();
	return data.data;
}

type Params = Promise<{ locale: string }>;

export default async function NewsPage({ params }: { params: Params }) {
	const { locale } = await params;
	setRequestLocale(locale);

	const articles = await getArticles();
	console.log("Articles:", articles);
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8">Noticias</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{articles.map((article: any) => {
					return (
						<Link
							key={article.id}
							href={`/news/${article.documentId}`}
							className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
							<div className="relative h-48 w-full bg-gray-200 flex items-center justify-center">
								{article.cover?.url ? (
									<Image
										src={`${STRAPI_URL}${article.cover.url}`}
										alt={article.cover.caption}
										width={400}
										height={300}
										className="object-cover w-full h-full"
									/>
								) : (
									<span className="text-gray-400">📰</span>
								)}
							</div>

							<div className="p-4">
								<h2 className="text-xl font-semibold mb-2">{article.title}</h2>

								<p className="text-gray-600 line-clamp-3">
									{article.description}
								</p>

								<div className="mt-4 text-sm text-gray-500">
									{new Date(article.publishedAt).toLocaleDateString(
										locale === "es" ? "es-AR" : "en-US",
									)}
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

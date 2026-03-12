import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { fetchArticleBySlug } from "@/lib/api/articles";
import { getStrapiMediaURL } from "@/lib/strapi";
import Top from "@/components/News/Top";
import Content from "@/components/News/Content";
import Footer from "@/components/News/Footer";
import FullBleed from "@/components/common/FullBleed";
import { SyncArticleLocaleMap } from "@/components/common/ArticleLocaleContext";

const BASE_URL = "https://www.medmindls.com";
type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({
	params,
}: {
	params: Params;
}): Promise<Metadata> {
	const { locale, slug } = await params;
	const article = await fetchArticleBySlug(slug, locale);
	if (!article) return {};
	const otherLocale = locale === "es" ? "en" : "es";
	const coverUrl = getStrapiMediaURL(article.cover?.url);
	return {
		title: article.title,
		description: article.content.slice(0, 155).replace(/\n/g, " "),
		alternates: {
			canonical: `${BASE_URL}/${locale}/news/${slug}`,
			languages: {
				[otherLocale]: `${BASE_URL}/${otherLocale}/news/${slug}`,
			},
		},
		openGraph: {
			title: article.title,
			description: article.content.slice(0, 155).replace(/\n/g, " "),
			url: `${BASE_URL}/${locale}/news/${slug}`,
			type: "article",
			publishedTime: article.publishedAt,
			...(coverUrl ? { images: [{ url: coverUrl }] } : {}),
		},
		twitter: {
			card: "summary_large_image",
			title: article.title,
			description: article.content.slice(0, 155).replace(/\n/g, " "),
			...(coverUrl ? { images: [coverUrl] } : {}),
		},
	};
}

function ArticleJsonLd({
	article,
	locale,
	slug,
}: {
	article: {
		title: string;
		content: string;
		publishedAt: string;
		author?: { fullname: string };
		cover?: { url: string };
	};
	locale: string;
	slug: string;
}) {
	const coverUrl = getStrapiMediaURL(article.cover?.url);
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: article.title,
		datePublished: article.publishedAt,
		...(article.author
			? { author: { "@type": "Person", name: article.author.fullname } }
			: {}),
		...(coverUrl ? { image: coverUrl } : {}),
		url: `${BASE_URL}/${locale}/news/${slug}`,
		publisher: { "@type": "Organization", name: "MedMind", url: BASE_URL },
	};
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}

export default async function ArticlePage({ params }: { params: Params }) {
	const { locale, slug } = await params;
	setRequestLocale(locale);

	const article = await fetchArticleBySlug(slug, locale);

	if (!article) {
		notFound();
	}

	// Build slug mapping for language switching
	const slugMap: Record<string, string> = {
		[locale]: slug, // Current locale and slug
	};

	// Add localized slugs from API
	if (article.localizations) {
		article.localizations.forEach((loc) => {
			slugMap[loc.locale] = loc.slug;
		});
	}

	return (
		<div>
			<SyncArticleLocaleMap slugMap={slugMap} />
			<ArticleJsonLd article={article} locale={locale} slug={slug} />
			<FullBleed>
				<Top article={article} locale={locale} />
			</FullBleed>
			<Content article={article} />
			<Footer article={article} />
		</div>
	);
}

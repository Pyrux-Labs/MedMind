"use client";
import type { Article } from "@/lib/api/articles";
import { getStrapiURL } from "@/lib/strapi";
import Image from "next/image";

interface FooterProps {
	article: Article;
}

const Footer = ({ article }: FooterProps) => {
	console.log(article);
	console.log(article.author.avatar.url);
	console.log(article.author.fullname);

	if (!article.author || !article.author.avatar) return null;

	return (
		<div className="flex items-center justify-end gap-2.5">
			<Image
				src={getStrapiURL(article.author.avatar.url)}
				alt={article.author.avatar.alternativeText ?? article.author.fullname}
				width={62}
				height={62}
				className="rounded-full"
			/>
			<div>
				<p className="label text-secondary-color!">Autora</p>
				<p className="label">{article.author.fullname}</p>
			</div>
		</div>
	);
};

export default Footer;

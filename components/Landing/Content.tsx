"use client";

import { useTranslations } from "next-intl";

const Content = () => {
	const tHealth = useTranslations("health");
	const tEducation = useTranslations("education");

	return (
		<div>
			<section>
				<h2>{tHealth("title")}</h2>
				<p>{tHealth("description")}</p>
				<ul>
					{(tHealth.raw("items") as string[]).map(
						(item: string, index: number) => (
							<li key={index}>{item}</li>
						),
					)}
				</ul>
			</section>
			<section>
				<h2>{tEducation("title")}</h2>
				<p>{tEducation("description")}</p>
				<ul>
					{(tEducation.raw("items") as string[]).map(
						(item: string, index: number) => (
							<li key={index}>{item}</li>
						),
					)}
				</ul>
			</section>
		</div>
	);
};

export default Content;

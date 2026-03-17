"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { useArticleLocaleMap } from "./ArticleLocaleContext";
import Image from "next/image";

const languages = [
	{ code: "es" as const, label: "Español" },
	{ code: "en" as const, label: "English" },
];

const LanguageDropdown = () => {
	const locale = useLocale();
	const pathname = usePathname();
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const localeSlugMap = useArticleLocaleMap();

	const selected = languages.find((l) => l.code === locale) || languages[0];

	const toggleOpen = () => setOpen((v) => !v);

	const selectLanguage = (lang: (typeof languages)[number]) => {
		setOpen(false);
		const targetSlug = localeSlugMap[lang.code];
		if (targetSlug) {
			router.replace(`/news/${targetSlug}`, { locale: lang.code });
		} else {
			router.replace(pathname, { locale: lang.code });
		}
	};

	return (
		<div className="relative flex px-2 select-none z-1">
			<div
				className={`w-23 border border-main-color bg-main-bg transition-all duration-150
                ${open ? "rounded-t-xl border-b-transparent" : "rounded-xl"}`}>
				<div
					className="h-6.5 px-3 flex items-center justify-between cursor-pointer leading-none"
					onClick={toggleOpen}
					role="button"
					aria-expanded={open}
					aria-label={selected.label}
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							toggleOpen();
						}
					}}>
					<Image
						src="/icons/language.svg"
						alt="language"
						width={16}
						height={18}
					/>
					<p className="label leading-none translate-y-px">{selected.label}</p>
				</div>
			</div>

			<div
				className={`absolute top-full left-2 right-2 rounded-b-xl border border-t-0 border-main-color bg-main-bg
                origin-top transition-all duration-200 ease-out
                ${
									open
										? "opacity-100 scale-y-100 pointer-events-auto"
										: "opacity-0 scale-y-75 pointer-events-none"
								}`}>
				{languages
					.filter((lang) => lang.code !== selected.code)
					.map((lang) => (
						<div
							key={lang.code}
							className="h-6.5 px-3 flex items-center justify-end cursor-pointer border-t border-main-color hover:bg-main-color/10 transition-colors duration-100"
							onClick={() => selectLanguage(lang)}>
							<p className="label leading-none translate-y-px">{lang.label}</p>
						</div>
					))}
			</div>
		</div>
	);
};

export default LanguageDropdown;

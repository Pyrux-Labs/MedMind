"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useState } from "react";

const languages = [
	{ code: "es" as const, label: "Español" },
	{ code: "en" as const, label: "English" },
];

const LanguageDropdown = () => {
	const locale = useLocale();
	const pathname = usePathname();
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const selected = languages.find((l) => l.code === locale) || languages[0];

	const toggleOpen = () => setOpen((v) => !v);

	const selectLanguage = (lang: (typeof languages)[number]) => {
		setOpen(false);
		router.replace(pathname, { locale: lang.code });
	};

	return (
		<div className="relative flex px-2 select-none">
			<div
				className={`w-22 border border-main-color bg-main-bg transition-all duration-150
                ${open ? "rounded-t-lg border-b-transparent" : "rounded-lg"}`}>
				<div
					className="h-7 px-2 flex items-center justify-between cursor-pointer"
					onClick={toggleOpen}>
					<img
						src="languageIcon.svg"
						alt="languageIcon"
						className="w-3.5 h-4"
					/>
					<p className="label">{selected.label}</p>
				</div>
			</div>

			<div
				className={`absolute top-full left-2 right-2 rounded-b-lg border border-t-0 border-main-color bg-main-bg
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
							className="h-7 px-2 flex items-center justify-end cursor-pointer border-t border-main-color hover:bg-main-color/10 transition-colors duration-100"
							onClick={() => selectLanguage(lang)}>
							<p className="label">{lang.label}</p>
						</div>
					))}
			</div>
		</div>
	);
};

export default LanguageDropdown;

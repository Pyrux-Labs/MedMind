"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import LanguageDropdown from "./LanguageDropdown";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const NavBar = () => {
	const t = useTranslations("nav");
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<>
			<aside
				className="w-full h-15 flex items-center justify-between px-4 md:px-8 lg:px-13 border border-secondary-bg shadow-custom"
				role="navigation"
				aria-label="Main navigation">
				<Link href="/" aria-label="MedMind home">
					<Image
						src="/icons/logo.svg"
						alt="MedMind logo"
						width={177}
						height={62}
						className="w-32 md:w-44"
						style={{ height: "auto" }}
					/>
				</Link>

				{/* Desktop nav */}
				<div className="hidden lg:flex items-center gap-8 w-fit h-full">
					<nav className="flex w-fit h-full justify-between gap-8 xl:gap-17 label items-center">
						<Link
							href="/"
							className="hover:opacity-70 transition-opacity duration-200">
							{t("home").toUpperCase()}
						</Link>
						<Link
							href="/news"
							className="hover:opacity-70 transition-opacity duration-200">
							{t("news").toUpperCase()}
						</Link>
						<Link
							href="/about"
							className="hover:opacity-70 transition-opacity duration-200 whitespace-nowrap">
							{t("about").toUpperCase()}
						</Link>
						<Link
							href="/contact"
							className="hover:opacity-70 transition-opacity duration-200">
							{t("contact").toUpperCase()}
						</Link>
						<LanguageDropdown />
					</nav>
				</div>

				{/* Hamburger button */}
				<button
					className="lg:hidden flex flex-col gap-1.5 cursor-pointer p-2"
					onClick={() => setMobileOpen(true)}
					aria-label="Open menu">
					<span className="block w-6 h-0.5 bg-main-color" />
					<span className="block w-6 h-0.5 bg-main-color" />
					<span className="block w-6 h-0.5 bg-main-color" />
				</button>
			</aside>

			<MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
		</>
	);
};

export default NavBar;

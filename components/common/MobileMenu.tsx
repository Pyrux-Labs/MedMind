"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageDropdown from "./LanguageDropdown";
import Image from "next/image";

interface MobileMenuProps {
	open: boolean;
	onClose: () => void;
}

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
	const t = useTranslations("nav");

	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	const navLinks = [
		{ href: "/", label: t("home") },
		{ href: "/news", label: t("news") },
		{ href: "/about", label: t("about") },
		{ href: "/contact", label: t("contact") },
	];

	return (
		<>
			{/* Overlay */}
			<div
				className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
				onClick={onClose}
			/>

			{/* Panel */}
			<div
				className={`fixed top-0 right-0 h-full w-80 bg-main-bg z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}
			>
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-main-color/10">
					<Link href="/" onClick={onClose} aria-label="MedMind home">
						<Image
							src="/icons/logo.svg"
							alt="MedMind logo"
							width={130}
							height={46}
							style={{ height: "auto" }}
						/>
					</Link>
					<button
						onClick={onClose}
						className="w-9 h-9 flex items-center justify-center cursor-pointer rounded-full hover:bg-main-color/8 transition-colors duration-200"
						aria-label="Close menu"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-main-color"
						>
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>

				{/* Navigation */}
				<nav className="flex flex-col flex-1 px-6 pt-8">
					{navLinks.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							onClick={onClose}
							className="group flex items-center gap-4 py-5 border-b border-main-color/10 last:border-b-0"
						>
							<span className="w-0.5 h-5 rounded-full bg-secondary-color opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" />
							<span className="label text-[15px] tracking-[0.12em] uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-200">
								{label}
							</span>
						</Link>
					))}
				</nav>

				{/* Footer */}
				<div className="px-6 py-7 border-t border-main-color/10 flex flex-col gap-5">
					<LanguageDropdown />
					<div className="flex items-center gap-4">
						<a
							href="https://www.linkedin.com/in/medmind-linguistic-solutions"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Visit MedMind on LinkedIn"
							className="hover:opacity-60 transition-opacity duration-200"
						>
							<Image src="/social/linkedin.svg" alt="" width={22} height={22} />
						</a>
						<a
							href="https://www.instagram.com/medmindls"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Visit MedMind on Instagram"
							className="hover:opacity-60 transition-opacity duration-200"
						>
							<Image src="/social/instagram.svg" alt="" width={22} height={22} />
						</a>
					</div>
					<p className="label opacity-40 text-xs tracking-wide">info@medmind.com.ar</p>
				</div>
			</div>
		</>
	);
};

export default MobileMenu;

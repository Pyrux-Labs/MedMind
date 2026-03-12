"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Toast from "./Toast";

interface SocialButtonProps {
    src: string;
    href?: string;
    email?: string;
}

const SocialButton = ({ src, href, email }: SocialButtonProps) => {
    const t = useTranslations("common");
    const [showToast, setShowToast] = useState(false);

    const iconName = src.split("/").pop()?.replace(".svg", "") || "social";

    const image = <Image src={src} alt="" height={28} width={28} />;

    const handleEmailClick = () => {
        if (email) {
            navigator.clipboard.writeText(email);
            setShowToast(true);
        }
    };

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit MedMind on ${iconName}`}
                className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
            >
                {image}
            </a>
        );
    }

    return (
        <>
            <button
                onClick={handleEmailClick}
                aria-label={`Copy email: ${email}`}
                className="cursor-pointer bg-transparent border-none p-0 hover:opacity-70 transition-opacity duration-200"
            >
                {image}
            </button>
            <Toast
                message={t("emailCopied")}
                visible={showToast}
                onHide={() => setShowToast(false)}
            />
        </>
    );
};

export default SocialButton;

"use client";

import { useTranslations } from "next-intl";
import Button from "../common/MainButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Contact = () => {
    const t = useTranslations("callToAction");
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    return (
        <div
            ref={ref}
            className={`fade-up ${isVisible ? "revealed" : ""} group hover-gradient-bg relative my-16 lg:my-30 h-auto py-6 lg:py-0 lg:h-33 shadow-custom border-2 border-main-color rounded-xl flex flex-col md:flex-row items-center px-6 md:px-10 lg:px-16 justify-between gap-10 md:gap-0 hover:border-transparent transition-colors duration-200`}
        >
            <h2 className="contact_us text-center md:text-left">
                {t("question")}
            </h2>
            <Button label={t("cta")} />
        </div>
    );
};

export default Contact;

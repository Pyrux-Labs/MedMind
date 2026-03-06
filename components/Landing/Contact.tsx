"use client";

import { useTranslations } from "next-intl";
import Button from "../ui/MainButton";

const Contact = () => {
    const t = useTranslations("callToAction");

    return (
        <div className="group hover-gradient-bg relative my-30 h-33 shadow-custom border-2 border-main-color rounded-xl flex items-center px-16 justify-between hover:border-transparent transition-colors duration-200">
            <h1 className="contact_us">{t("question")}</h1>
            <Button label={t("cta")} />
        </div>
    );
};

export default Contact;

"use client";

import { useTranslations } from "next-intl";
import Button from "../common/MainButton";

const Contact = () => {
    const t = useTranslations("callToAction");

    return (
        <div className="group hover-gradient-bg relative my-30 h-33 shadow-custom border-2 border-main-color rounded-xl flex items-center px-16 justify-between hover:border-transparent transition-colors duration-200">
            <h2 className="contact_us">{t("question")}</h2>
            <Button label={t("cta")} />
        </div>
    );
};

export default Contact;

"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Footer = () => {
    const t = useTranslations("contact.info");

    return (
        <div className="my-30 flex justify-center gap-84">
            <div className="gap-5 flex flex-col text-center items-center">
                <Image
                    src="/contact/footer/contact.svg"
                    alt="contact.svg"
                    height={114}
                    width={114}
                />
                <h2 className="subtitle">{t("contact")}</h2>
                <p className="label text-footer-labels!">info@medmindls.com</p>
            </div>
            <div className="gap-5 flex flex-col text-center items-center">
                <Image
                    src="/contact/footer/location.svg"
                    alt="contact.svg"
                    height={114}
                    width={114}
                />
                <h2 className="subtitle">{t("location")}</h2>
                <p className="label text-footer-labels!">{t("country")}</p>
            </div>
        </div>
    );
};

export default Footer;

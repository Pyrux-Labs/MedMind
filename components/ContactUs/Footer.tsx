"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Footer = () => {
    const t = useTranslations("contact.info");

    return (
        <div className="my-16 lg:my-30 flex flex-col md:flex-row justify-center gap-10 md:gap-20 lg:gap-84">
            <div className="gap-5 flex flex-col text-center items-center">
                <Image
                    src="/contact/footer/contact.svg"
                    alt="Contact information"
                    height={114}
                    width={114}
                    className="w-20 h-20 md:w-28 md:h-28"
                />
                <h2 className="subtitle">{t("contact")}</h2>
                <p className="label text-footer-labels!">info@medmindls.com</p>
            </div>
            <div className="gap-5 flex flex-col text-center items-center">
                <Image
                    src="/contact/footer/location.svg"
                    alt="Location"
                    height={114}
                    width={114}
                    className="w-20 h-20 md:w-28 md:h-28"
                />
                <h2 className="subtitle">{t("location")}</h2>
                <p className="label text-footer-labels!">{t("country")}</p>
            </div>
        </div>
    );
};

export default Footer;

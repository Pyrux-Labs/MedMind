"use client";

import { useTranslations } from "next-intl";
import Founder from "./Founder";

const Content = () => {
    const t = useTranslations("about.founders");

    return (
        <div className="my-16 lg:my-30 flex flex-col lg:flex-row gap-12 lg:gap-16">
            <Founder
                name={t("guillermina.name")}
                bio={t("guillermina.bio")}
                imageSrc={"/about/content/guillebassi.jpeg"}
                email={"info@medmind.com.ar"}
                linkedIn={
                    "https://www.linkedin.com/in/guillermina-bassi-65908b195/"
                }
                className="lg:items-end lg:text-right"
            />
            <Founder
                name={t("lucia.name")}
                bio={t("lucia.bio")}
                imageSrc={"/about/content/lulabiselli.jpeg"}
                email={"info@medmind.com.ar"}
                linkedIn={"https://www.linkedin.com/in/luc%C3%ADabiselli/"}
                className="lg:mt-15"
            />
        </div>
    );
};

export default Content;

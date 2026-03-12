"use client";

import { useTranslations } from "next-intl";
import Founder from "./Founder";

const Content = () => {
    const t = useTranslations("about.founders");

    return (
        <div className="my-30 flex gap-37">
            <Founder
                name={t("guillermina.name")}
                bio={t("guillermina.bio")}
                imageSrc={"/abaut/content/test.jpeg"}
                email={"info@medmindls.com"}
                linkedIn={
                    "https://www.linkedin.com/in/guillermina-bassi-65908b195/"
                }
                className="items-end text-right"
            />
            <Founder
                name={t("lucia.name")}
                bio={t("lucia.bio")}
                imageSrc={"/abaut/content/lulabiselli.jpeg"}
                email={"info@medmindls.com"}
                linkedIn={"https://www.linkedin.com/in/luc%C3%ADabiselli/"}
                className="mt-15"
            />
        </div>
    );
};

export default Content;

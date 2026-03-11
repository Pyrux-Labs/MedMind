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
                imageSrc={"/test.jpeg"}
                email={"pyrux@pyrux.com.ar"}
                linkedIn={
                    "https://www.linkedin.com/in/guillermina-bassi-65908b195/"
                }
            />
            <Founder
                name={t("lucia.name")}
                bio={t("lucia.bio")}
                imageSrc={"/test.jpeg"}
                email={"pyrux@pyrux.com.ar"}
                linkedIn={"https://www.linkedin.com/in/luc%C3%ADabiselli/"}
            />
        </div>
    );
};

export default Content;

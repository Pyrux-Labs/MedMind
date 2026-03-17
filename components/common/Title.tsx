"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

type TitleProps = {
    text?: string;
    subtitle?: string;
    align?: "left" | "center" | "right";
    noMargin?: boolean;
};

const Title = ({
    text,
    subtitle,
    align = "left",
    noMargin = false,
}: TitleProps) => {
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
    const alignClass =
        align === "center"
            ? "text-center mx-auto"
            : align === "right"
              ? "text-right ml-auto"
              : "text-left";

    return (
        <div
            ref={ref}
            className={`${noMargin ? "mb-7" : "my-16 md:my-30"} ${alignClass} fade-up ${isVisible ? "revealed" : ""}`}
        >
            <h1
                className={`main-title underline underline-offset-8 md:underline-offset-15 decoration-secondary-color decoration-1`}
            >
                {text}
            </h1>
            {subtitle && <p className="subtitle mt-6 md:mt-11">{subtitle}</p>}
        </div>
    );
};

export default Title;

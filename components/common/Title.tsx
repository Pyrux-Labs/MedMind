"use client";
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
    const alignClass =
        align === "center"
            ? "text-center mx-auto"
            : align === "right"
              ? "text-right ml-auto"
              : "text-left";

    return (
        <div className={`${noMargin ? "mb-7" : "my-30"} ${alignClass}`}>
            <h1
                className={`main-title underline underline-offset-15 decoration-secondary-color decoration-1`}
            >
                {text}
            </h1>
            {subtitle && <p className="subtitle mt-11">{subtitle}</p>}
        </div>
    );
};

export default Title;

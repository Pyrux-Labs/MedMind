"use client";
type TitleProps = {
    text?: string;
    align?: "left" | "center" | "right";
    noMargin?: boolean;
};

const Title = ({ text, align = "left", noMargin = false }: TitleProps) => {
    const alignClass =
        align === "center"
            ? "text-center mx-auto"
            : align === "right"
              ? "text-right ml-auto"
              : "text-left";

    return (
        <h1
            className={`main-title ${noMargin ? "mb-7" : "my-30"} underline underline-offset-15 decoration-secondary-color decoration-1 ${alignClass}`}
        >
            {text}
        </h1>
    );
};

export default Title;

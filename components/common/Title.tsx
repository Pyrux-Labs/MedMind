"use client";
type TitleProps = {
    text?: string;
    align?: "left" | "center";
};

const Title = ({ text, align = "left" }: TitleProps) => {
    const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

    return (
        <h1
            className={`main-title my-30 underline underline-offset-15 decoration-secondary-color decoration-1 ${alignClass}`}
        >
            {text}
        </h1>
    );
};

export default Title;

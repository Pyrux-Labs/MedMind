"use client";
type TitleProps = {
    text?: string;
};

const Title = ({ text }: TitleProps) => {
    return (
        <h1 className="main-title my-30 underline underline-offset-15 decoration-secondary-color decoration-1">
            {text}
        </h1>
    );
};

export default Title;

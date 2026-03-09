import type { Article } from "@/types/article";

interface FooterProps {
    article: Article;
}

const Footer = ({ article }: FooterProps) => {
    return (
        <div>
            <p>{article.author}</p>
        </div>
    );
};

export default Footer;

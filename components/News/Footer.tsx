import type { Article } from "@/lib/api/articles";
import Image from "next/image";

interface FooterProps {
    article: Article;
}

const Footer = ({ article }: FooterProps) => {
    return (
        <div className="flex items-center justify-end gap-2.5">
            <Image
                src="/test.jpeg"
                alt="test"
                width={62}
                height={62}
                className="rounded-full"
            />
            <div>
                <p className="label text-secondary-color!">Autora</p>
                <p className="label">{article.author}</p>
            </div>
        </div>
    );
};

export default Footer;

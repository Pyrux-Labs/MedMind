import ReactMarkdown from "react-markdown";
import type { Article } from "@/lib/api/articles";

interface ContentProps {
    article: Article;
}

const headingComponents = {
    h1: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="subtitle">{children}</h2>
    ),
    h2: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="subtitle">{children}</h2>
    ),
    h3: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="subtitle">{children}</h3>
    ),
    h4: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 className="subtitle">{children}</h4>
    ),
    h5: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h5 className="subtitle">{children}</h5>
    ),
    h6: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h6 className="subtitle">{children}</h6>
    ),
    p: ({ children }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="text text-black!">{children}</p>
    ),
};

const Content = ({ article }: ContentProps) => {
    return (
        <div className="my-10 md:my-20 lg:my-30 overflow-hidden break-words">
            <ReactMarkdown components={headingComponents}>
                {article.content}
            </ReactMarkdown>
        </div>
    );
};

export default Content;

import ReactMarkdown from "react-markdown";

const markdownComponents = {
    h1: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="subtitle mt-6 mb-3">{children}</h2>
    ),
    h2: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="subtitle mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="subtitle mt-5 mb-2">{children}</h3>
    ),
    h4: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 className="subtitle mt-4 mb-2">{children}</h4>
    ),
    h5: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h5 className="subtitle mt-4 mb-2">{children}</h5>
    ),
    h6: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h6 className="subtitle mt-4 mb-2">{children}</h6>
    ),
    p: ({ children }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="text text-black! mb-4">{children}</p>
    ),
    ul: ({ children }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="list-disc pl-6 mb-4 text text-black!">{children}</ul>
    ),
    ol: ({ children }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className="list-decimal pl-6 mb-4 text text-black!">{children}</ol>
    ),
    li: ({ children }: React.HTMLAttributes<HTMLLIElement>) => (
        <li className="mb-1">{children}</li>
    ),
    strong: ({ children }: React.HTMLAttributes<HTMLElement>) => (
        <strong className="font-medium text-black!">{children}</strong>
    ),
    em: ({ children }: React.HTMLAttributes<HTMLElement>) => (
        <em>{children}</em>
    ),
    blockquote: ({ children }: React.HTMLAttributes<HTMLElement>) => (
        <blockquote className="border-l-4 border-secondary-color pl-4 my-4 text text-black! italic">
            {children}
        </blockquote>
    ),
};

interface MarkdownContentProps {
    content: string;
}

const MarkdownContent = ({ content }: MarkdownContentProps) => (
    <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
);

export default MarkdownContent;

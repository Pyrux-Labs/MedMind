import MarkdownContent from "@/components/common/MarkdownContent";
import type { Article } from "@/lib/api/articles";

interface ContentProps {
    article: Article;
}

const Content = ({ article }: ContentProps) => {
    return (
        <div className="my-10 md:my-20 lg:my-30 overflow-hidden wrap-break-word">
            <MarkdownContent content={article.content} />
        </div>
    );
};

export default Content;

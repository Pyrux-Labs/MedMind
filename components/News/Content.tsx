import type { Article } from "@/types/article";

interface ContentProps {
    article: Article;
}

const Content = ({ article }: ContentProps) => {
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
    );
};

export default Content;

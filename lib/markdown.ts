/**
 * Strips markdown syntax and returns plain text.
 * Used for previews where raw markdown would show as noise (e.g. cards).
 */
export function stripMarkdown(markdown: string): string {
    return markdown
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1") // images → alt text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links → text
        .replace(/#{1,6}\s+/gm, "") // headings
        .replace(/\*\*(.*?)\*\*/g, "$1") // bold
        .replace(/\*(.*?)\*/g, "$1") // italic
        .replace(/__(.*?)__/g, "$1") // bold underscore
        .replace(/_(.*?)_/g, "$1") // italic underscore
        .replace(/`{1,3}[\s\S]*?`{1,3}/g, "") // code
        .replace(/^\s*[-*+]\s+/gm, "") // unordered lists
        .replace(/^\s*\d+\.\s+/gm, "") // ordered lists
        .replace(/^>\s+/gm, "") // blockquotes
        .replace(/\n+/g, " ") // newlines → spaces
        .trim();
}

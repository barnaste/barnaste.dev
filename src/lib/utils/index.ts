export const fetchMarkdownPosts = async () => {
    // import all files that match the glob (wildcard string)
    const allPostFiles = import.meta.glob('/src/lib/posts/*.md');
    const iterablePostFiles = Object.entries(allPostFiles);
    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const { metadata } = await resolver() as { metadata: any };
            const postPath = path.slice(15, -3);

            return {
                meta: metadata,
                path: postPath
            };
        })
    );

    return allPosts;
}

import { cubicOut } from "svelte/easing";
export function stagger(_: Element, { duration = 500, delay = 0 } = {}) {
    return {
        duration,
        delay,
        css: (t: number) => {
            const eased = cubicOut(t);

            return `
                transform: translateY(${(1 - eased) * 80}px);
                opacity: ${eased};
            `
        }
    };
}
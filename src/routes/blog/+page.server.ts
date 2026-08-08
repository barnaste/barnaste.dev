import { fetchMarkdownPosts } from "$lib/utils/posts";

export const load = async () => {
    const posts = await fetchMarkdownPosts();

    const sortedPosts = posts.sort((a, b) => {
        return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });

    return {
        posts: sortedPosts,
    };
};

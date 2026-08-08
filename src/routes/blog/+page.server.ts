import { fetchMarkdownPosts } from "$lib/utils/posts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const posts = await fetchMarkdownPosts();

    const sortedPosts = posts.sort((a, b) => {
        return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });

    return {
        posts: sortedPosts,
    };
};

import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
    try {
        const post = await import(`$lib/posts/${params.slug}.md`);
        const { title, date, description } = post.metadata;
        const Content = post.default;

        return {
            Content,
            title,
            date,
            description,
        };
    } catch {
        error(404, "Post not found");
    }
};

import { error } from "@sveltejs/kit";

export async function load({ params }) {
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
}

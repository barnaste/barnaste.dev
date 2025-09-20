export async function load({ params }) {
    try {
        const post = await import(`$lib/posts/${params.slug}.md`);
        const { title, date, description } = post.metadata;
        const Content = post.default;

        return {
            Content,
            title,
            date,
            description
        };
    } catch (error) {
        return {
            status: 404,
            error: new Error("Post not found")
        };
    }
}
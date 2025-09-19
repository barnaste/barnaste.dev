<script lang="ts">
    import "../blog.css";
    import "prismjs"; // code syntax highlighting theme
    import "../prism-nord.css"; // code syntax highlighting theme
    import "prismjs/components/prism-rust"; // load Rust syntax highlighting

    export let data;
    const { title, date, Content } = data;
</script>

{#if data.status == 404}
    <h1>404 - Not Found</h1>
    <p>The blog post you are looking for does not exist.</p>
    <p><a href="/blog">Go back to the blog index</a></p>

{:else if data.status == 500}
    <h1>500 - Server Error</h1>
    <p>There was an error loading the blog post.</p>
    <p><a href="/blog">Go back to the blog index</a></p>
    
{:else}
    <!-- margin offset exists to counteract the default header padding -->
    <article class="blog-article">
        <h1 class="mt-2 text-3xl font-bold">{title}</h1>
        <p class="text-slate-500 dark:text-slate-400 mb-6 mt-4">{new Date(date).toDateString()}</p>

        <Content />
    </article>
{/if}
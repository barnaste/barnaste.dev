<script lang="ts">
    import "../blog.css";
    import "prismjs"; // code syntax highlighting theme
    import "../prism-nord.css"; // code syntax highlighting theme
    import "prismjs/components/prism-rust"; // load Rust syntax highlighting

    export let data;
    const { title, date, description, Content } = data;
</script>

<svelte:head>
    <title>{title} | Stefan Barna</title>
    <meta name="description" content="{description}" />
    <meta name="author" content="Stefan Barna" />

    <meta property="og:title" content="{title} | Stefan Barna" />
    <meta property="og:description" content="{description}" />
    <meta property="og:type" content="article" />

    <meta property="article:published_time" content={new Date(date).toISOString()} />

    <base target="_blank" />
</svelte:head>

{#if data.status == 404}
    <h1 class="text-lg text-slate-500 dark:text-slate-400">404 - Not Found</h1>
    <p class="text-xl font-semibold">The post you are looking for does not exist.</p>
    <p class="mt-4 hover:translate-x-1 transition-transform duration-200"><a href="/blog">← Return to Blog Index</a></p>

{:else if data.status == 500}
    <h1 class="text-lg text-slate-500 dark:text-slate-400">500 - Server Error</h1>
    <p class="text-xl font-semibold">There was an error loading the blog post.</p>
    <p class="mt-4 hover:translate-x-1 transition-transform duration-200"><a href="/blog">← Return to Blog Index</a></p>
    
{:else}
    <!-- margin offset exists to counteract the default header padding -->
    <article class="blog-article">
        <h1 class="mt-2 text-3xl font-bold">{title}</h1>
        <p class="text-slate-500 dark:text-slate-400 mb-6 mt-4">{new Date(date).toDateString()}</p>

        <Content />
    </article>
{/if}
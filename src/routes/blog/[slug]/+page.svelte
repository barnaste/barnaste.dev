<script lang="ts">
    import "../blog.css";
    import "../prism-nord.css"; // code syntax highlighting theme

    export let data;
    const { title, date, description, Content } = data;
</script>

<svelte:head>
    <title>{title} | Stefan Barna</title>
    <meta name="description" content={description} />
    <meta name="author" content="Stefan Barna" />

    <meta property="og:title" content="{title} | Stefan Barna" />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="article" />

    <meta property="article:published_time" content={new Date(date).toISOString()} />
</svelte:head>

<!-- margin offset exists to counteract the default header padding -->
<article class="blog-article">
    <h1 class="mt-2 text-3xl font-bold">{title}</h1>
    <p class="text-olive-500 dark:text-olive-400 mb-6 mt-4">{new Date(date).toDateString()}</p>

    <Content />
</article>

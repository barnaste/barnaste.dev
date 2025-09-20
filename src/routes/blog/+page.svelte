<script lang="ts">
    export let data;
</script>

<svelte:head>
    <title>Blog | Stefan Barna</title>
    <meta name="description" content="Collection of my writings." />
    <meta name="author" content="Stefan Barna" />

    <meta property="og:title" content="Blog | Stefan Barna" />
    <meta property="og:description" content="Collection of my writings." />
    <meta property="og:type" content="website" />
</svelte:head>

<h1 class="text-2xl font-semibold mb-8">My Writing</h1>
{#each data.posts as post}
    <div class="mb-6 hover:translate-x-1 transition-transform group">
        <a href="/blog/{post.path}">
            <span class=" group-hover:text-olive-dark transition-colors duration-200">{post.meta.title}</span>
            <p class="text-slate-500 dark:text-slate-400">{new Date(post.meta.date).toDateString()}</p>
        </a>
    </div>
{/each}
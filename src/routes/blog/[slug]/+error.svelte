<script lang="ts">
    import { page } from "$app/state";
</script>

<svelte:head>
    <title>{page.status == 404 ? "Not Found" : "Error"} | Stefan Barna</title>
</svelte:head>

{#if page.status == 404}
    <h1 class="text-lg text-olive-500 dark:text-olive-400">404 - Not Found</h1>
    <p class="text-xl font-semibold">The post you are looking for does not exist.</p>
    <p class="mt-4 hover:translate-x-1 transition-transform duration-200">
        <a href="/blog">← Return to Blog Index</a>
    </p>
{:else}
    <h1 class="text-lg text-olive-500 dark:text-olive-400">500 - Server Error</h1>
    <p class="text-xl font-semibold">There was an error loading the blog post.</p>
    <p class="mt-4 hover:translate-x-1 transition-transform duration-200">
        <a href="/blog">← Return to Blog Index</a>
    </p>
{/if}

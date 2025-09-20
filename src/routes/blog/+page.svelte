<script lang="ts">
    import { onMount } from 'svelte';
    import { stagger } from '$lib/utils';
    
    export let data;

    let visible = false;
    onMount(() => {
        visible = true;
    });

</script>

<svelte:head>
    <title>Blog | Stefan Barna</title>
    <meta name="description" content="Collection of my writings." />
    <meta name="author" content="Stefan Barna" />

    <meta property="og:title" content="Blog | Stefan Barna" />
    <meta property="og:description" content="Collection of my writings." />
    <meta property="og:type" content="website" />
</svelte:head>

{#if visible}
    <h1 class="text-2xl font-semibold mb-8" transition:stagger>My Writing</h1>
{/if}

{#each data.posts as post, index}
    {#if visible}
        <div 
            class="mb-6 hover:translate-x-1 group translate-y-4 transition-all ease-out"
            transition:stagger={{ delay: (index + 1) * 100 }}
        >
            <a href="/blog/{post.path}">
                <span class="group-hover:text-olive-dark transition-colors">{post.meta.title}</span>
                <p class="text-slate-500 dark:text-slate-400">{new Date(post.meta.date).toDateString()}</p>
            </a>
        </div>
    {/if}
{/each}
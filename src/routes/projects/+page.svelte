<script lang="ts">
    import { onMount } from "svelte";
    import { stagger } from "$lib/utils";
    let visible = false;
    onMount(() => {
        visible = true;
    });

</script>

<svelte:head>
    <title>Projects | Stefan Barna</title>
    <meta name="description" content="Collection of my projects." />
    <meta name="author" content="Stefan Barna" />

    <meta property="og:title" content="Projects | Stefan Barna" />
    <meta property="og:description" content="Collection of my projects." />
    <meta property="og:type" content="website" />
</svelte:head>

{#if visible}
    <h1 class="text-2xl font-semibold mb-8" transition:stagger>My Projects</h1>
    <p transition:stagger>Coming soon!</p>
{/if}
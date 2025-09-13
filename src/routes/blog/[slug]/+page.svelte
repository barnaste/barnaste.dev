<script lang="ts">
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
    <article>
        <h1>{title}</h1>
        <time>Published {date}</time>

        <Content />
    </article>
{/if}
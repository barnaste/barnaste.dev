<script lang="ts">
    export let data;
</script>

<h1 class="text-2xl font-semibold mb-10">My Writing</h1>
{#each data.posts as post}
    <div class="mb-6">
        <a href="/blog/{post.path}" class="text-lg hover:underline">{post.meta.title}</a>
        <p class="text-slate-500 dark:text-slate-400">{new Date(post.meta.date).toDateString()}</p>
    </div>
{/each}
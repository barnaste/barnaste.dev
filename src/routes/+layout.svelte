<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
    import { page } from '$app/state';
    import DarkThemeToggle from '$lib/components/DarkThemeToggle.svelte';
	
	let { children } = $props();

	const links = [
		{ href: "/", label: "home" },
		{ href: "/projects", label: "projects" },
		{ href: "/blog", label: "blog" },
	];

	// check whether the given href is the start of the current path
	function isActive(href: string) {
		let pathname = page.url.pathname;
		// home is always matched, so treat it as a special case
		if (href == "/") {
			return pathname === "/";
		} return pathname.startsWith(href);
	}
</script>

<svelte:head>
	<title>Stefan Barna</title>
	<meta
		name="description"
		content="Computer Science Student at the Univerity of Toronto"
	/>
	<link rel="icon" href={favicon} />

</svelte:head>

<div class="mx-auto w-2xl">
	<!-- Header -->
	<header class="flex items-center justify-between py-8">
		<!-- Name -->
		<a href="/" class="text-2xl font-bold">Stefan Barna</a>

		<!-- Navigation -->
		<nav>
			<ul class="flex gap-6">
				{#each links as { href, label }}
					<li>
						<a
							href={href}
							class="hover:underline {isActive(href) ? 'font-semibold underline' : ''}"
							>{label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>

		<!-- Dark Mode Toggle -->
		 <DarkThemeToggle />
	</header>

	<!-- Main Content -->
	{@render children?.()}

	<!-- Footer -->
</div>


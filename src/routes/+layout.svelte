<script lang="ts">
	import "../app.css";
	import qed from "$lib/assets/qed.svg";
	import { page } from "$app/state";
	import DarkThemeToggle from "$lib/components/DarkThemeToggle.svelte";

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
		}
		return pathname.startsWith(href);
	}
</script>

<svelte:head>
	<link rel="icon" href={qed} />
</svelte:head>

<div class="mx-auto w-2xl max-w-full px-8 lg:px-0">
	<!-- Header -->
	<header class="flex items-center justify-between pt-12 pb-4">
		<!-- Name -->
		<a href="/" class="text-xl font-semibold">Stefan Barna</a>

		<!-- Navigation -->
		<div class="flex items-center gap-4">
			<nav class="flex items-center gap-4 px-2">
				{#each links as { href, label }}
					<a
						{href}
						class="text-sm
							{isActive(href)
							? 'text-olive-900 dark:text-olive-50 transition-none hover:text-olive-900 dark:hover:text-olive-50 font-medium'
							: 'text-olive-500 dark:text-olive-400 transition-colors duration-200 hover:text-olive-700 dark:hover:text-olive-200 font-normal'}"
					>
						{label}
					</a>
				{/each}
			</nav>

			<!-- Dark Mode Toggle -->
			<DarkThemeToggle />
		</div>
	</header>

	<!-- Main Content -->
	<div class="py-14">
		{@render children?.()}
	</div>

	<!-- Footer -->
</div>

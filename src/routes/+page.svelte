<script lang="ts">
    import "iconify-icon";
    import ContactLinks from "$lib/components/ContactLinks.svelte";

    import { onMount } from "svelte";
    import { stagger } from "$lib/utils/stagger";
    let visible = false;
    onMount(() => {
        visible = true;
    });

    import { isMobile } from "$lib/utils/media";
    // per-component delays
    $: titleDelay   = $isMobile ? 0 : 0;
    $: statsDelay   = $isMobile ? 75 : 100;
    $: contactDelay = $isMobile ? 150 : 150;
    $: blurbDelay   = $isMobile ? 225 : 200;
    $: skillDelay   = $isMobile ? 300 : 150;
    $: photoDelay   = $isMobile ? 375 : 200;
</script>

<svelte:head>
    <title>Stefan Barna</title>
    <meta
        name="description"
        content="Computer Science Student at the Univerity of Toronto"
    />
    <meta name="author" content="Stefan Barna" />

    <meta property="og:title" content="Stefan Barna" />
    <meta
        property="og:description"
        content="Computer Science Student at the Univerity of Toronto"
    />
    <meta property="og:type" content="website" />
</svelte:head>

<!-- top-level region organization -->
<div class="flex flex-col gap-24">
    <!-- About Me -->
    <div class="flex flex-row flex-wrap justify-between gap-y-8 items-center max-lg:justify-center">
        {#if visible}
        <!-- Left Column -->
        <div class="flex flex-col gap-y-6 w-85">
            <div class="flex flex-col gap-y-3" transition:stagger={{ delay: titleDelay }}>
                <h1 class="text-5xl font-bold">Hi, I'm Stefan</h1>

                <!-- Available for Work -->
                <!-- TODO: link should be to resume, not email -->
                <div class="flex flex-row items-center">
                    <div class="bg-olive rounded-full h-3 w-3 my-auto mx-3"></div>
                    <div class="relative h-auto w-fit overflow-hidden group my-auto">
                        <span class="block border-b-2 border-dashed border-slate-400 text-base text-slate-500 dark:text-slate-400 cursor-pointer transition-none">
                            <span class="block transition-transform duration-300 ease-in-out group-hover:-translate-y-5">
                                Available for Work
                            </span>
                            <span class="block absolute top-5 transition-transform duration-300 ease-in-out group-hover:-translate-y-5" >
                                <a href="mailto:stefan.barna@mail.utoronto.ca">View Resume 🖶</a>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <!-- Location and University -->
            <div class="flex flex-col gap-y-3 px-4" transition:stagger={{ delay: statsDelay }}>
                <!-- Location -->
                <div class="flex flex-row gap-x-2">
                    <iconify-icon icon="lucide:map-pin" width=24></iconify-icon>
                    <p>Toronto, ON</p>
                </div>

                <!-- University -->
                <div class="flex flex-row gap-x-2">
                    <iconify-icon icon="lucide:landmark" width=24></iconify-icon>
                    <p>University of Toronto</p>
                </div>
            </div>

            <!-- Contact Links -->
            <div class="mt-1 ml-4" transition:stagger={{ delay: contactDelay }}><ContactLinks /></div>

            <!-- Blurb -->
            <p transition:stagger={{ delay: blurbDelay }} class="text-slate-600 dark:text-slate-400">
                I'm a student at the University of Toronto studying Maths and Computer Science, with a particular interest in theory and logic.
                I enjoy reading modern classics and philosophy. At some point I'll end up writing about them here.
            </p>
        </div>
        
        <!-- Right Column -->
        <div class="flex flex-col gap-y-6 pt-2 w-70">
            <!-- Key Skills -->
            <ul class="flex flex-row flex-wrap gap-2 justify-center" transition:stagger={{ delay: skillDelay }}>
                <li class="skill-card">
                    <iconify-icon icon="simple-icons:rust" width=24></iconify-icon>
                    <p class="skill-card-text">Rust</p>
                </li>
                <li class="skill-card">
                    <iconify-icon icon="lineicons:python" width=24></iconify-icon>
                    <p class="skill-card-text">Python</p>
                </li>
                <li class="skill-card">
                    <iconify-icon icon="streamline-logos:c-language-logo-solid" width=24></iconify-icon>
                    <p class="skill-card-text">C</p>
                </li>
                <li class="skill-card">
                    <iconify-icon icon="ri:java-fill" width=24></iconify-icon>
                    <p class="skill-card-text">Java</p>
                </li>
                <li class="skill-card">
                    <iconify-icon icon="devicon-plain:redis" width=24></iconify-icon>
                    <p class="skill-card-text">Redis</p>
                </li>
                <li class="skill-card">
                    <iconify-icon icon="devicon-plain:haskell" width=24></iconify-icon>
                    <p class="skill-card-text">Haskell</p>
                </li>
                <li class="skill-card">
                    <iconify-icon icon="akar-icons:postgresql-fill" width=24></iconify-icon>
                    <p class="skill-card-text">PostgreSQL</p>
                </li>
                <li class="skill-card">
                    <iconify-icon icon="mdi:tailwind" width=24></iconify-icon>
                    <p class="skill-card-text">Tailwind CSS</p>
                </li>
            </ul>

            <!-- Photo -->
            <div class="rounded-sm bg-slate-100 dark:bg-slate-800 h-50 flex justify-center items-center
            max-lg:w-full max-lg:scale-115 max-lg:mt-10" transition:stagger={{ delay: photoDelay }}>
                <p class="text-slate-800 dark:text-slate-200">Placeholder</p>
            </div>
        </div>
        {/if}
    </div>
</div>
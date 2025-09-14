<script lang="ts">
    import "iconify-icon";
    import ContactLinks from "$lib/components/ContactLinks.svelte";
</script>

<!-- top-level region organization -->
<div class="flex flex-col gap-24">
    <!-- About Me -->
    <div class="flex flex-row justify-between">
        <!-- Left Column -->
        <div class="w-1/2 flex flex-col gap-y-6">
            <div class="flex flex-col gap-y-3">
                <h1 class="text-5xl font-bold">Hi, I'm Stefan!</h1>

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
                                <a href="mailto:stefan.barna@mail.utoronto.ca">Contact Me →</a>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <div class="flex flex-col gap-y-3 px-4">
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
            <div class="mt-1 ml-4"><ContactLinks /></div>

            <!-- Blurb -->
            <p>
                I'm a student at the University of Toronto studying Computer
                Science and Maths, with a particular interest in theoretical computer 
                science and programming languages.
            </p>
        </div>
        
        <!-- Right Column -->
        <div class="w-3/7 flex flex-col gap-y-6 pt-2">
            <!-- Key Skills -->
            <ul class="flex flex-row flex-wrap gap-2 justify-center">
                <div class="skill-card">
                    <iconify-icon icon="simple-icons:rust" width=24></iconify-icon>
                    <p class="skill-card-text">Rust</p>
                </div>
                <div class="skill-card">
                    <iconify-icon icon="lineicons:python" width=24></iconify-icon>
                    <p class="skill-card-text">Python</p>
                </div>
                <div class="skill-card">
                    <iconify-icon icon="streamline-logos:c-language-logo-solid" width=24></iconify-icon>
                    <p class="skill-card-text">C</p>
                </div>
                <div class="skill-card">
                    <iconify-icon icon="ri:java-fill" width=24></iconify-icon>
                    <p class="skill-card-text">Java</p>
                </div>
                <div class="skill-card">
                    <iconify-icon icon="devicon-plain:redis" width=24></iconify-icon>
                    <p class="skill-card-text">Redis</p>
                </div>
                <div class="skill-card">
                    <iconify-icon icon="devicon-plain:haskell" width=24></iconify-icon>
                    <p class="skill-card-text">Haskell</p>
                </div>
                <div class="skill-card">
                    <iconify-icon icon="akar-icons:postgresql-fill" width=24></iconify-icon>
                    <p class="skill-card-text">PostgreSQL</p>
                </div>
                <div class="skill-card">
                    <iconify-icon icon="mdi:tailwind" width=24></iconify-icon>
                    <p class="skill-card-text">TailwindCSS</p>
                </div>
            </ul>

            <!-- Photo -->
            <div class="rounded-sm bg-slate-100 dark:bg-slate-800 h-1/1 flex justify-center items-center">
                <p class="text-slate-800 dark:text-slate-200">Placeholder</p>
            </div>
        </div>
    </div>
</div>
<script lang="ts">
    import "iconify-icon";
    import ContactLinks from "$lib/components/ContactLinks.svelte";
</script>

<!-- top-level region organization -->
<div class="my-16 flex flex-col gap-24">
    <!-- About Me -->
    <div class="flex flex-row-gap-20">
        <!-- Left Column -->
        <div class="w-4/7 flex flex-col gap-y-6">
            <div class="flex flex-col gap-y-3">
                <h1 class="text-5xl font-bold">Hi, I'm Stefan</h1>

                <!-- Available for Work -->
                <!-- todo: on study term: available for work summer 2026 as a hover effect. maybe underline to indicate interactability? -->
                <div class="flex flex-row items-center">
                    <div class="bg-olive rounded-full h-3 w-3 my-auto mx-3"></div>
                    <div class="relative h-auto w-fit overflow-hidden group my-auto">
                        <span class="block border-b-2 border-dashed border-slate-400 text-base text-slate-500 dark:text-slate-300 cursor-pointer transition-none">
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

            <!-- TODO: Contact Links -->
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
        </div>

    </div>
</div>
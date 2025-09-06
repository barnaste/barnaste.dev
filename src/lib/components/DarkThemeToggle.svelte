<script lang="ts">
    import { Sun, Moon } from "@lucide/svelte";
    import { backOut, cubicOut } from "svelte/easing";

    // spin animation
    // direction === 1 => clockwise
    // direction === -1 => counter-clockwise
    function spin(node: Element, { duration = 800, direction = 1 }) {
        return {
            duration,
            css: (t: number) => {
                return `transform: scale(${0.5 + cubicOut(t) * 0.5}) rotate(${backOut(t) * 360 * direction}deg)`;
            },
        };
    }

    // toggle between light and dark modes
    let darkMode = $state(false);

    function toggleDark() {
        document.body.classList.toggle("dark");
        darkMode = !darkMode;
    }
</script>

<button onclick={toggleDark}>
    <div
        class="transition-all duration-200 hover:scale-110
        text-slate-700 hover:text-slate-950
        dark:text-slate-200 dark:hover:text-slate-50"
    >
        {#if darkMode}
            <div in:spin={{ duration: 800, direction: -1 }}>
                <Moon />
            </div>
        {:else}
            <div in:spin={{ duration: 800, direction: 1 }}>
                <Sun />
            </div>
        {/if}
    </div>
</button>

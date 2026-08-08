<script lang="ts">
    import { Sun, Moon } from "@lucide/svelte";
    import { backOut, cubicOut } from "svelte/easing";
    import { browser } from "$app/environment";

    // spin animation
    // direction === 1 => clockwise
    // direction === -1 => counter-clockwise
    function spin(_: Element, { duration = 800, direction = 1 }) {
        return {
            duration,
            css: (t: number) => {
                return `
                    transform: scale(${0.5 + cubicOut(t) * 0.5})
                    rotate(${backOut(t) * 360 * direction}deg)
                `;
            },
        };
    }

    // toggle between light and dark modes. the theme script in app.html has
    // already applied the class, so the initial icon follows from it
    let darkMode = $state(browser && document.body.classList.contains("dark"));

    function toggleDark() {
        document.body.classList.toggle("dark");
        darkMode = !darkMode;
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }
</script>

<button onclick={toggleDark} aria-label="Toggle Dark Mode">
    <div
        class="transition-all duration-200 hover:scale-110
        text-olive-700 hover:text-olive-950
        dark:text-olive-200 dark:hover:text-olive-50"
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

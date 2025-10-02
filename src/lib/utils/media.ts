import { readable } from "svelte/store";
import { onMount } from "svelte";

export function mediaQuery(query: string) {
  return readable(false, (set) => {
    let mql: MediaQueryList;

    // run on client only after mounting
    onMount(() => {
      mql = window.matchMedia(query);
      const update = () => set(mql.matches);

      update(); // initial check
      mql.addEventListener("change", update);

      return () => mql.removeEventListener("change", update);
    });
  });
}

// export a convenience store for mobile
export const isMobile = mediaQuery("(max-width: 1024px)");
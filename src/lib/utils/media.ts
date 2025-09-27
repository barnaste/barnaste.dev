import { readable } from "svelte/store";

export function mediaQuery(query: string) {
  return readable(false, (set) => {
    const mql = window.matchMedia(query);

    const update = () => set(mql.matches);

    update(); // initial
    mql.addEventListener("change", update);

    return () => mql.removeEventListener("change", update);
  });
}

// export a convenience store for mobile
export const isMobile = mediaQuery("(max-width: 1024px)");
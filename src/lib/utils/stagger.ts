import { cubicOut } from "svelte/easing";
export function stagger(_: Element, { duration = 500, delay = 0 } = {}) {
    return {
        duration,
        delay,
        css: (t: number) => {
            const eased = cubicOut(t);

            return `
                transform: translateY(${(1 - eased) * 20}px);
                opacity: ${eased};
            `
        }
    };
}
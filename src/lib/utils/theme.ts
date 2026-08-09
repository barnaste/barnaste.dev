import { cubicInOut } from "svelte/easing";

const DURATION = 800;
// bands lean 15 degrees off vertical and sweep out of the top-left corner
const ANGLE = 105;

type Line = { start: number; at: number; dark: boolean; reveal?: (dark: boolean) => void };

let overlay: HTMLElement | null = null;
let content: HTMLElement | null = null;
let lines: Line[] = [];
let frame = 0;

function swap(dark: boolean) {
    document.body.classList.add("theme-swapping");

    document.body.classList.toggle("dark", dark);
    overlay?.classList.toggle("dark", !dark);
    overlay?.classList.toggle("light", dark);

    // resolve the new colours while transitions are silenced, so nothing cross-fades
    void document.body.offsetWidth;
    document.body.classList.remove("theme-swapping");

    localStorage.setItem("theme", dark ? "dark" : "light");
}

// cloneNode leaves the icon elements without a shadow root, so they would resolve a
// frame late and reflow the copy. drop in the svg they have already rendered.
function freezeIcons(source: Element, copy: Element) {
    const cloned = copy.querySelectorAll("iconify-icon");

    source.querySelectorAll("iconify-icon").forEach((icon, i) => {
        const svg = icon.shadowRoot?.querySelector("svg")?.cloneNode(true) as SVGElement;
        if (!svg) return;

        // the host is inline-block with vertical-align 0; baseline alignment would
        // give the line box extra descender space and shift everything below it
        const { display, verticalAlign } = getComputedStyle(icon);
        svg.style.display = display;
        svg.style.verticalAlign = verticalAlign;
        svg.setAttribute("class", icon.getAttribute("class") ?? "");
        cloned[i].replaceWith(svg);
    });
}

// a still copy of the page, held at the outgoing theme and wiped away band by band
function open() {
    const source = document.querySelector("body > div")!;
    const copy = source.cloneNode(true) as Element;
    freezeIcons(source, copy);

    content = document.createElement("div");
    content.style.transform = `translateY(${-window.scrollY}px)`;
    content.append(copy);

    overlay = document.createElement("div");
    overlay.className = "theme-sweep";
    overlay.inert = true;
    overlay.ariaHidden = "true";
    overlay.append(content);

    document.body.append(overlay);
}

function mask(edges: number[]) {
    const bounds = [0, ...edges, 1];
    const bands: string[] = [];

    // counting from the left, even bands fall through to the live page underneath
    for (let i = 0; i < bounds.length - 1; i++) {
        const band = i % 2 ? "#000" : "#0000";
        bands.push(`${band} ${bounds[i] * 100}%`, `${band} ${bounds[i + 1] * 100}%`);
    }

    return `linear-gradient(${ANGLE}deg, ${bands.join(", ")})`;
}

// how far along the gradient axis a point sits, 0 at the start corner and 1 at the end
function project(el: Element) {
    const box = overlay!.getBoundingClientRect();
    const target = el.getBoundingClientRect();

    const radians = (ANGLE * Math.PI) / 180;
    const dx = Math.sin(radians);
    const dy = -Math.cos(radians);
    const length = Math.abs(box.width * dx) + Math.abs(box.height * dy);

    // the trailing corner, so the element is wholly uncovered before it is told
    const x = target.right - box.left - box.width / 2;
    const y = target.bottom - box.top - box.height / 2;

    return 0.5 + (x * dx + y * dy) / length;
}

function tick() {
    const now = performance.now();

    for (const line of lines) {
        if (line.reveal && cubicInOut((now - line.start) / DURATION) >= line.at) {
            line.reveal(line.dark);
            line.reveal = undefined;
        }
    }

    lines = lines.filter((line) => now - line.start < DURATION);

    if (lines.length === 0) {
        overlay!.remove();
        overlay = null;
        content = null;
        return;
    }

    const edges = lines
        .map((line) => cubicInOut((now - line.start) / DURATION))
        .sort((a, b) => a - b);

    content!.style.transform = `translateY(${-window.scrollY}px)`;
    overlay!.style.maskImage = mask(edges);

    frame = requestAnimationFrame(tick);
}

// `reveal` fires when the new line clears `anchor`, so an animation on it plays in
// full instead of starting underneath the copy
export function toggleTheme(anchor: Element, reveal: (dark: boolean) => void) {
    const dark = !document.body.classList.contains("dark");

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        swap(dark);
        reveal(dark);
        return;
    }

    if (!overlay) open();

    swap(dark);
    lines.push({ start: performance.now(), at: project(anchor), dark, reveal });

    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(tick);
}

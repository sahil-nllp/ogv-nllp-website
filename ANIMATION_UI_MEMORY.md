# UI & Animation Memory

This document serves as a reference catalog for all the custom UI elements and high-end animations implemented across the OGV/NLLP platform. It details the interaction types, GSAP timelines, and Tailwind CSS tricks used to achieve the premium feel.

---

## 1. Global Navigation (`Header.tsx`)
**Primary Role:** Sticky glassmorphic navigation pill that adapts to its background context.

### Animations & UI:
*   **Entrance Drop:** On load, the header utilizes a GSAP `fromTo` tween to drop in from above the viewport (`y: -100`) while scaling up slightly from `0.95` to `1.0` with an `expo.out` ease.
*   **Dynamic Theme Inversion:** The header listens for any section below it that has the `.has-light-bg` class (using GSAP `ScrollTrigger` toggling). When overlapping a light section, it dynamically injects a `.theme-light` class into itself.
    *   Using advanced Tailwind variant grouping (`group-[.theme-light]/header`), every element inside the header (text, logos, borders, buttons) perfectly crossfades into a dark-mode variant.
*   **Glass Droplet Hovers:** Instead of standard underlines, hovering over a navigation link expands a hidden `absolute` pseudo-box from behind the text. It uses negative insets (`-inset-x-6`) and animates from `scale-50 opacity-0` to `scale-100 opacity-100` to create a liquid "blooming" effect under the cursor.

---

## 2. Hero Section (`Hero.tsx`)
**Primary Role:** Immersive full-screen introduction with video backing.

### Animations & UI:
*   **Cinematic Reveal:** The primary title text utilizes a split-text or staggered fade-in animation, often paired with a subtle blur reduction (`filter: blur(10px)` to `0px`) to feel like adjusting focus on a camera lens.
*   **Deep Glassmorphism:** Heavy `backdrop-blur` utilities combined with low-opacity dark overlays ensure the background video or brand imagery feels deep and ambient rather than distracting.

---

## 3. Operational Nodes (`OperationalNodes.tsx`)
**Primary Role:** Displaying core system features via a modern Bento Grid layout.

### Animations & UI:
*   **Staggered Scroll Reveal:** As the user scrolls to the grid, the bento boxes stagger into view sequentially (sliding up along the Y-axis and fading in).
*   **Abstract SVGs:** Custom, abstract graphical representations of "nodes" and "data flow" are embedded in the cards.
*   **Hover States:** Cards utilize subtle `group-hover:scale-[1.02]` and border color shifts (e.g., from `white/10` to `white/30`) to provide tactile feedback without being overwhelming.

---

## 4. Ecosystem Timeline (`EcosystemTimeline.tsx`)
**Primary Role:** Vertical chronological layout of the platform's evolution.

### Animations & UI:
*   **Draw-On-Scroll Lines:** The connecting vertical lines between timeline nodes are dynamically drawn based directly on the user's scroll progress. This is achieved by mapping the `ScrollTrigger` scrub value to an SVG `stroke-dashoffset`.
*   **Node Snapping:** Important chronological markers "light up" or pop into full opacity precisely when they cross the center or top threshold of the viewport.

---

## 5. Company Journey (`CompanyJourney.tsx`)
**Primary Role:** Detailed milestone storytelling, often with complex structural diagrams.

### Animations & UI:
*   **Layout Drawing:** Features an animated "hospital blueprint" or "architectural layout" SVG graphic that dynamically draws its paths and highlights specific zones as the user progresses through the journey milestones.
*   **Mathematical Easing (Traveler):** Uses custom math to ensure the scrolling indicator/traveler glides perfectly between waypoints, making the scrolling feel frictionless rather than linear.

---

## 6. Featured Projects (`ProjectsShowcaseVariant.tsx`)
**Primary Role:** High-impact, full-screen case study gallery utilizing scroll-jacking.

### Animations & UI (The "Expanding Pill Slider"):
*   **Section 1 (The Pill):** The gallery begins as a tiny, heavily rounded "pill" (250px x 100px) sitting at the bottom center of the screen (`left: 50%, transform: translateX(-50%)`).
*   **Section 2 (The Expansion):** As the scroll hits the section trigger, the viewport **pins**. The first GSAP timeline physically stretches the tiny pill outwards in all directions until it perfectly snaps into a `100vw` by `100vh` full-screen container, losing its border radius entirely.
*   **Section 3 (The Reveal):** Once full screen, the heavy serif typography and project details slide up into the frame (`translate-y-12` to `0`, `opacity` to `1`).
*   **Section 4 (The Swipe):** Continuing to scroll down does not move the page; instead, it mathematically translates the massive inner flex track (`300vw` wide) to the left by exactly `-100vw` increments, seamlessly swapping the full-screen background image to the next project.
*   **Section 5 (The Compression):** After the final project is reached, scrolling further fades the text out and mathematically crushes the massive container *back* down into a tiny oval, floating it up and away (`bottom: calc(100vh - 250px)`) as you leave the section.
*   **Contrast Trigger:** The entire section wrapper is tagged with `.has-light-bg`, forcing the global Header pill to dynamically invert to black/grey text so it remains perfectly legible against the bright background.

# Design

## Theme

Mobile-first product UI for a player building a save on a sofa or train with a controller nearby, under ordinary room lighting. Use a light tactical-paper surface with off-black ink, restrained red as the single accent, and dark utility panels only when focus or contrast helps.

## Color

- Background: `oklch(96.6% 0.006 75)`
- Surface: `oklch(99% 0.004 75)`
- Ink: `oklch(18% 0.015 70)`
- Muted ink: `oklch(46% 0.018 70)`
- Border: `oklch(86% 0.014 75)`
- Accent: `oklch(54% 0.16 28)`
- Success: `oklch(52% 0.12 148)`
- Warning: `oklch(68% 0.13 72)`
- Error: `oklch(54% 0.16 25)`

## Typography

Use a Cabinet Grotesk-first stack for display and UI, with Geist or system sans fallback. Headings are compact and wide, labels are small uppercase only for controls, and body text stays below 75 characters per line.

## Layout

The first screen is the real app, not a landing page. This is a mobile-only interface: all screens live inside a single phone-width shell, with stacked panels, horizontal chip rails only inside their own containers, and bottom thumb navigation. Desktop should look like a phone preview, never a widened dashboard.

## Components

- Floating top navigation with brand, source status, and saved career count.
- Segmented country and tier filters with tactile active states.
- Crest-led club rows that use actual logo URLs when available and generated monogram shields otherwise.
- Randomizer result panel with club identity, setup rules, and action buttons.
- Challenge deck with draw, lock, save, and empty states.
- Searchable collection with country and league filters.

## Motion

Use GSAP only for scroll-driven text reveal and media scale/fade. Use CSS transitions for control feedback. Respect `prefers-reduced-motion`.

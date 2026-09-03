# Design System: Mobilização Pro (Stitch Prototype)

## World
A high-fidelity, data-dense political campaign platform (SaaS-like) leveraging Material 3 tokens, glassmorphism, and a high-contrast dark mode. It bridges a consumer-friendly gamified "Supporter App" with a dense, analytical "Master Admin" command center.

## Typography
- **Display & Headlines:** `Plus Jakarta Sans` (weights: 600, 700, 800). Used for major stats, dashboard titles, and gamification tiers.
- **Body & Labels:** `Inter` (weights: 400, 700). Used for UI components, data tables, micro-copy, and navigation.

## Palette (Dark Mode Native)
- **Background & Surfaces:** `#111415` (background), `#191c1d` (surface-container-low), `#1d2021` (surface-container), `#282a2b` (surface-container-high).
- **Primary (Action/Electoral Yellow):** `#ffe4af` (base), `#ffc107` (container), `#fabd00` (fixed dim). Used for primary buttons, highlights, and active states.
- **Tertiary (Success/Gamification Green):** `#98fe94` (base), `#7ce17b` (container). Used for completion metrics, progress bars, and positive stats.
- **Secondary (Navy/Trust):** `#364571` (container), `#b6c5f9` (dim). Used for active states in navigation and deep UI backgrounds.
- **Glass Panel:** `rgba(21, 38, 79, 0.6)` with `backdrop-filter: blur(12px)` and subtle yellow border `rgba(255, 228, 175, 0.1)`. Used extensively in Admin Dashboard metrics.

## Component Grammar
- **Icons:** Material Symbols Outlined (filled and outlined variants used for active/inactive states).
- **Borders:** `0.25rem` to `0.75rem` radii (`rounded-xl` for cards, `rounded-full` for avatars and pills).
- **Navigation (Mobile):** Top header with avatar/profile greeting; Bottom sticky navbar with 5 primary destinations (`pb-safe` applied).
- **Navigation (Desktop):** 64-width fixed left sidebar with active state highlights (primary or secondary container).
- **Cards:** Heavy use of `bg-surface-container` with 1px `border-surface-variant` or `border-outline-variant`.

## Execution Notes
100% fidelity to the Stitch HTML prototypes is required. Components must use the exact Tailwind classes and Material Symbols provided in the reference code.

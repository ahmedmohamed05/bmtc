```markdown
# Design System Document: STU Management Technical College

## 1. Overview & Creative North Star
### The "Academic Monolith"
The digital presence of the STU Management Technical College must mirror the physical permanence of a government institution. This design system moves away from generic "admin dashboard" templates to embrace a **High-End Editorial** aesthetic. We define our Creative North Star as **"The Academic Monolith"**—a system built on stability, architectural symmetry, and the quiet authority of ministerial excellence.

Rather than relying on decorative elements, we achieve a premium feel through **intentional whitespace, rigorous typography, and tonal depth**. This system is designed specifically for a Right-to-Left (RTL) Arabic context, ensuring that the visual flow honors the natural direction of the script while maintaining a sophisticated, modern layout.

---

## 2. Colors & Tonal Hierarchy
The palette is rooted in the "Navy of Authority" and "Gold of Excellence." We avoid a flat, "webby" look by utilizing a sophisticated layering of surface colors.

### The Palette
- **Primary (Action):** `#1A9FD4` (Used for momentum—buttons, active states, and links).
- **Secondary (Prestige):** `#C9A84C` (The "Seal of Excellence"—reserved for accents, icons, and special badges).
- **Navy (Foundation):** `#0D2B45` (Headers, sidebars, and structural anchors).
- **Backgrounds:** `#F4F6F9` (Primary background) transitioning to `#FFFFFF` for content cards.

### The "No-Line" Sectioning Rule
To maintain a high-end editorial feel, designers are instructed to **minimize 1px solid borders for large sectioning.** Instead, define boundaries through background color shifts:
- Use `surface-container-low` (`#f2f4f7`) for the main canvas.
- Use `surface-container-lowest` (`#ffffff`) for primary content modules.
- Only use the **Ghost Border** (`#E2E8F0`) when physical containment is required for accessibility, particularly on cards and input fields.

---

## 3. Typography
Typography is the most critical element of the collegiate identity. We use a high-contrast scale to create an authoritative hierarchy.

### The Typefaces
- **Headlines:** **Noto Kufi Arabic** (Bold). An architectural, stable script that conveys government-level gravity. 
- **Body:** **Cairo** (Regular). A modern, highly legible sans-serif designed for screen clarity.

### The Editorial Scale
- **Display (Display-lg):** 3.5rem. Reserved for hero statements.
- **Headline (Headline-md):** 1.75rem | Color: `#0D2B45` | Weight: Bold.
- **Body (Body-lg):** 1rem | Color: `#1A2535` | **Line Height: 1.8**. (The 1.8 line height is mandatory to provide the "breathing room" required for premium Arabic typesetting).
- **Labels (Label-md):** 0.75rem. Used for metadata and small captions.

---

## 4. Elevation & Depth
While we avoid "glassmorphism" to maintain ministerial sobriety, we use **Tonal Layering** to create a sense of physical importance.

### Layering Principle
Depth is achieved by "stacking" white cards over light gray backgrounds. 
- **The Shadow Rule:** Shadows must be "Ambient." Use a blur value of `20px` to `40px` with an opacity of `4%` to `6%`. The shadow should feel like a soft glow, not a dark smudge.
- **Card Specs:** 
  - Radius: `10px` (`xl` scale).
  - Border: `1px` solid `#E2E8F0`.
  - Background: `#FFFFFF`.

---

## 5. Components

### Buttons (The Action System)
- **Primary:** `#1A9FD4` background with white text. `6px` (`md`) border radius. 
- **Secondary:** White background with `#1A9FD4` border and text.
- **Padding:** Medium (`1rem` horizontal, `0.625rem` vertical).
- **Interaction:** On hover, a subtle tonal shift—no dramatic color changes.

### Academic Tables
Tables are designed for high-density data without visual clutter.
- **Header:** Background `#EAF4FB` | Text: `#0D2B45` (Bold).
- **Rows:** Alternating White (`#FFFFFF`) and Soft Tint (`#FAFBFC`).
- **Separators:** Forbid vertical lines. Use only horizontal `#E2E8F0` lines to guide the eye across the Arabic script.

### Badges (The Hierarchy of Roles)
Pill-shaped containers (`full` radius) with centered text:
- **ROOT:** Gold (`#C9A84C`) with White text.
- **Dept Head:** Blue (`#1A9FD4`) with White text.
- **Admin:** Gray (`#E2E8F0`) with Navy text.

### Navigation Architecture
- **Public Site:** Sticky top navigation. Use a high-density Navy header for the main college identity.
- **Dashboard:** Right-aligned sidebar (RTL). The sidebar should use the Navy `#0D2B45` palette to anchor the user's workspace, with active states highlighted in Primary Gold or Blue.
- **AI Assistant:** A floating action button (FAB). A perfect circle in Blue (`#1A9FD4`) positioned in the bottom-left (to accommodate RTL layouts).

---

## 6. Do's and Don'ts

### Do
- **Do** prioritize right-alignment for all text and icons.
- **Do** use the "Primary Gold" sparingly; it is an accent, not a structural color.
- **Do** ensure 1.8 line height for all Arabic body text to prevent "crowding" of diacritics.
- **Do** use whitespace as a primary separator instead of heavy lines.

### Don't
- **Don't** use 100% black text. Use the "Regular Text Dark" (`#1A2535`) to keep the interface feeling sophisticated.
- **Don't** use gradients or neon colors. The aesthetic must remain "Ministerial."
- **Don't** use sharp corners. Stick to the `6px` and `10px` radius rules to maintain a modern, approachable dignity.
- **Don't** clutter the dashboard. If a piece of information isn't vital, move it to a secondary layer.

---

## 7. Spacing & Grid
The system uses a strict 4px-based grid (e.g., `0.25rem`, `0.5rem`, `1rem`). 
- **Container Padding:** Always use `2rem` (`spacing-8`) for main content areas to ensure the "Editorial" feel isn't compromised by cramped margins.
- **Gutter:** Use `1.5rem` (`spacing-6`) between cards.```
# Design System Specification: High-End Security & Access Control

## 1. Overview & Creative North Star: "The Silent Sentinel"
This design system is built on the philosophy of **The Silent Sentinel**. In high-stakes vehicle access and security, the interface should feel authoritative, calm, and hyper-intelligent. We are moving away from the "clunky dashboard" aesthetic toward a sophisticated, editorial-tech experience.

The visual direction breaks the traditional grid-lock by utilizing **intentional asymmetry** and **tonal depth**. Instead of boxing information, we curate it. By utilizing high-contrast typography scales (Space Grotesk vs. Manrope) and deep, layered navy surfaces, we create an environment that feels like a premium command center rather than a standard SaaS app.

---

## 2. Colors & Surface Logic
The palette is rooted in a deep, atmospheric navy, designed to reduce eye strain in security environments while making the Electric Blue (`primary`) accents feel luminous and critical.

### The "No-Line" Rule
To achieve a high-end feel, **1px solid borders for sectioning are strictly prohibited.** Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background provides enough contrast to guide the eye without creating visual noise.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of smoked glass and carbon.
- **Base Layer:** `surface` (#0e1322) - The foundation.
- **Secondary Tier:** `surface-container-low` (#161b2b) - For sidebar or secondary navigation zones.
- **Action Tier:** `surface-container` (#1a1f2f) - For main content cards.
- **Elevated Tier:** `surface-container-high` (#25293a) - For modals or "active" states.

### Signature Textures & Glass
While background gradients are avoided to maintain a "clean" tech look, use **Glassmorphism** for floating elements (like license plate pop-overs). Use semi-transparent `surface-container-highest` with a `20px` backdrop-blur. For primary CTAs, use a subtle "glow" gradient from `primary` (#adc6ff) to `primary-container` (#4d8eff) to give the button a tactile, backlit energy.

---

## 3. Typography: The Editorial Scale
We use a dual-font strategy to balance "High-Tech" with "High-Readability."

*   **Display & Headlines (Space Grotesk):** This is our "Tech" voice. Use it for license plates, vehicle counts, and major section headers. Its geometric nature feels engineered and modern.
*   **Body & Titles (Manrope):** This is our "Functional" voice. Highly legible at small sizes, used for data logs, settings, and descriptions.

**Hierarchy Guidance:**
- **Display-LG (3.5rem):** Reserved for critical KPIs (e.g., total entries today).
- **Headline-SM (1.5rem):** Use for page titles; pair with a `body-sm` description for an editorial feel.
- **Label-MD (0.75rem):** Use `secondary` gray (#8A8FA8) for all metadata to ensure the primary data "pops."

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "web 2.0" for this system. We use **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by stacking. Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a natural "sunken" or "lifted" feel without a single shadow.
*   **Ambient Shadows:** If an element must float (e.g., a critical alert), use a shadow with a `40px` blur at `8%` opacity, tinted with the `primary` blue to mimic the glow of a screen in a dark room.
*   **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use the `outline-variant` token at **15% opacity**. This creates a "whisper" of a line that defines space without cluttering the view.

---

## 5. Components & Primitives

### Buttons
- **Primary:** `primary` background with `on-primary` text. `1rem` (lg) rounded corners. Use a subtle inner-glow (1px top-border in a lighter blue) to make it look machined.
- **Secondary:** `surface-container-highest` background. No border.
- **Tertiary:** Ghost style. `primary` text, no background until hover.

### Inputs & Vehicle Search
- **Standard State:** Use `surface-container-low` with a 2px bottom-bar in `outline-variant`.
- **Focus State:** Transition the bottom-bar to `primary` and add a subtle `primary-container` background tint.

### Cards & Lists (The "No Divider" Rule)
**Divider lines are forbidden.** 
- Separate list items using `8px` of vertical whitespace. 
- Use alternating background tones (Zebra striping) using `surface` and `surface-container-low` for dense data logs (like entrance/exit history).

### Access Chips
- **Success (Access Granted):** `tertiary-container` (#00a74b) background with `tertiary` (#4ae176) text.
- **Error (Blocked):** `error-container` (#93000a) background with `error` (#ffb4ab) text.
- Shape: Always `full` (pill-shaped) for high contrast against rectangular vehicle data.

### Specialized Component: The Plate Monitor
A high-contrast card using `surface-container-highest`. Use `Space Grotesk` for the license plate string at `Headline-LG` size. This is the "Hero" of the interface—it should look like a physical object placed on the digital surface.

---

## 6. Do’s and Don’ts

### Do
- **Do** use whitespace as a separator. If you feel the need for a line, add 16px of padding instead.
- **Do** use `Space Grotesk` for all alphanumeric vehicle data to emphasize the "tech" nature of the system.
- **Do** use `surface-dim` for the background of the entire app to ensure the `primary` blue feels "electric."

### Don’t
- **Don't** use 100% white (#FFFFFF). Use `on-surface` (#dee1f7) for primary text to avoid "vibrating" against the dark background.
- **Don't** use standard "drop shadows." Only use tonal shifts or ultra-diffused ambient glows.
- **Don't** use sharp 90-degree corners. Even the smallest tooltip must follow the `sm` (0.25rem) roundedness scale.

---

## 7. Token Summary Reference
- **Main BG:** `surface` (#0e1322)
- **Primary Action:** `primary` (#adc6ff)
- **Neutral Container:** `surface-container` (#1a1f2f)
- **High-End Border (Ghost):** `outline-variant` @ 15% (#424754)
- **Typography (Head):** Space Grotesk
- **Typography (Body):** Manrope
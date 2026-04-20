# Design Brief: ResumeForge

## Purpose & Context
Professional resume builder SaaS. Knowledge workers spend hours editing and refining. Design must reduce cognitive load, provide calm focus, and never distract from content.

## Tone
Refined, intentional, editorial. Premium B2B productivity tool — like Linear or Stripe's dashboard. Minimal decoration. Every pixel serves function.

## Differentiation
Resume builder that feels professional, not transactional. Clean editor interface with breathing room. Clear visual hierarchy between template selection, editing zones, and payment flow. Accessible color contrast throughout.

## Color Palette

| Name       | OKLCH (Light)     | OKLCH (Dark)      | Purpose                    |
|:-----------|:------------------|:------------------|:---------------------------|
| Background | 0.97 0 0          | 0.1 0 0           | Primary surface            |
| Foreground | 0.2 0 0           | 0.93 0 0          | Text, primary content      |
| Card       | 1.0 0 0           | 0.14 0 0          | Elevated surfaces          |
| Primary    | 0.48 0.06 244     | 0.7 0.08 248      | CTAs, accents (muted teal) |
| Destructive| 0.55 0.22 25      | 0.65 0.19 22      | Delete, danger actions     |
| Muted      | 0.88 0 0          | 0.16 0 0          | Secondary text, dividers   |
| Border     | 0.92 0 0          | 0.22 0 0          | Subtle dividers            |

## Typography
- **Display**: General Sans (geometric, strong) — headings, template labels
- **Body**: DM Sans (refined, proven) — all content, editor text, instructions
- **Mono**: Geist Mono (clean, technical) — code snippets, skill formatting

## Elevation & Depth
No floating shadows. Depth via background color layers: sidebar (bg-sidebar), cards (bg-card), main content (bg-background). Subtle bottom borders on headers and section dividers.

## Structural Zones

| Zone       | Light Background | Dark Background | Treatment                |
|:-----------|:-----------------|:-----------------|:------------------------|
| Header     | bg-card          | bg-sidebar      | Border-bottom, solid bg  |
| Sidebar    | bg-sidebar       | bg-sidebar      | Divider on right         |
| Main       | bg-background    | bg-background   | Full height, breathing   |
| Editor     | bg-card          | bg-card         | Subtle elevated shadow   |
| Footer     | bg-muted/10      | bg-muted/10     | Border-top, minimal      |

## Component Patterns
- Buttons: primary (teal), secondary (muted), destructive (red). Fixed 10px radius.
- Forms: clean inputs with light borders, focus ring in primary color.
- Cards: no rounded corners for template previews, subtle shadows.
- Editor toolbar: horizontal layout, grouped by type (text formatting, alignment, sections).

## Motion & Interaction
Smooth 300ms transitions via `transition-smooth`. Gentle fade-in for modals. No bounce or elastic animations. Subtle elevation on hover via shadow-subtle.

## Constraints
- Max-width 1400px for content, centered. 
- Sidebar 280px fixed (if used).
- Editor main column 800px ideal for resume readability.
- Mobile-first responsive: stack to full-width below `md`.

## Signature Detail
Resume preview maintains actual printed layout proportions (A4 aspect). When editing, live preview maintains exact positioning. This honesty about final output builds user confidence.

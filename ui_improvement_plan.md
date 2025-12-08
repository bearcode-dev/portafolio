# Comprehensive UI/UX Improvement Plan

## 1. Design System & Consolidation
**Objective:** Unify styling logic and create a solid foundation for "Visual Excellence".
- [x] **Migrate SCSS to Tailwind**: refactor `style.scss` into Tailwind utility classes. This removes the legacy "dual-system" maintenance burden and ensures consistent design tokens.
- [x] **Color Palette Refinement**: Define a strict semantic color palette in `tailwind.config.js` (e.g., `brand-primary`, `brand-secondary`, `surface-1`, `surface-2`). Ensure these map to CSS variables for seamless **Dark Mode** support.
- [x] **Typography**: confirm font weights and line-heights are standardized for optimal readability. Use `Poiret One` strictly for display/headings and `Inter`/`Open Sans` for body text.

## 2. Component Modernization
**Objective:** Create "Premium", "Wow" factor components.
- [x] **Hero Section (Home)**: Redesign the landing intro with a dynamic layout. Implement a split-screen design that stacks gracefully on mobile. Add a subtle entrance animation.
- [x] **Navigation Bar**: Implement a "Glassmorphism" sticky header. It should blur the content behind it and shrink slightly on scroll.
- [x] **Buttons & CTAs**: Replace standard buttons with "Premium" variants—gradients, soft shadows, and hover lift effects.
- [x] **Project Cards**: Enhance the existing card design with clearer typography hierarchy, better spacing, and smoother hover states for the details reveal.

## 3. Dynamic Interactions (The "Alive" Feel)
**Objective:** Engage the user with micro-animations.
- [x] **Framer Motion Integration**: Add page transition effects (fade-in, slide-up) and scroll-triggered animations for sections (e.g., items appearing as you scroll down).
- [x] **Interactive Elements**: Add specific hover states to all interactive elements (links, cards, icons) to provide immediate feedback.

## 4. Section-Specific Improvements
- [x] **Experience Timeline**: Ensure the new timeline component fits perfectly with the new color palette and typography.
- [x] **About Page**: Refactor the grid layout for better readability using Tailwind Grid. Make the text columns and image/skill visualization balance better.
- [x] **Blog List**: Polish the blog cards to match the Project cards' premium feel.

## 5. Mobile Responsiveness
**Objective:** Ensure a "First-Class" mobile experience.
- [x] audit all new Tailwind layouts on mobile breakpoints (`sm`, `md`).
- [ ] Ensure touch targets (buttons, links) are large enough.
- [x] Verify the mobile menu animation is smooth and intuitive.

## Actionable First Steps
1.  [x] **Refactor Home Page**: Remove `.infoArea` / `.visualArea` SCSS and rebuild `BodyContent` with Tailwind.
2.  [x] **Global Styles**: Clean up `globals.css` to define the new color variables.
3.  [x] **Header Upgrade**: Convert Header styling to full Tailwind with glass effect and enhanced Framer Motion animations.

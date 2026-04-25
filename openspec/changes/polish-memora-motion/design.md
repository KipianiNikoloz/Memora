## Context

Memora is a Next app with an existing parchment-and-library visual system, shared global CSS, a sticky top nav, an authenticated app chrome, and page-level client interactions. Motion is currently limited to small hover transforms, so route changes, filtering, AI response updates, form state, and visual metaphors feel abrupt.

## Goals / Non-Goals

**Goals:**

- Create a calm, literary motion language that reinforces the shelf/library metaphor.
- Add app-wide page transitions and reusable motion primitives instead of scattered one-off effects.
- Polish key interaction moments across home, auth, library, new entry, entry detail, insights, librarian, and settings.
- Respect `prefers-reduced-motion` and avoid animation that causes layout shift or content overlap.
- Keep the implementation compatible with existing tests, routes, and data behavior.

**Non-Goals:**

- No redesign of the existing visual system, copy, information architecture, or routes.
- No backend, database, auth, AI runtime, or validation changes.
- No decorative animation that competes with reading or slows core workflows.
- No bespoke canvas/WebGL animation for this pass.

## Decisions

- Use the modern `motion` package for React. It provides `motion`, `AnimatePresence`, layout animations, gestures, and `useReducedMotion` through current `motion/react` APIs, which fits the requested full polish better than CSS-only transitions.
- Prefer shared motion wrappers and variant constants. Page shells, panels, cards, lists, chips, and buttons should use common variants so timing and easing feel coherent across the app.
- Use `LazyMotion` with `domAnimation` where practical. This keeps the animation feature bundle narrower while still supporting the needed opacity, transform, layout, hover, tap, and presence animations.
- Keep sticky structure stable. The top nav and sidebar should remain mounted and visually stable while main content transitions, avoiding full-page motion that makes navigation feel slippery.
- Treat motion as state communication. Library filtering should use layout animation, insights bars should reveal data values, AI responses should transition on text changes, auth tabs should show mode changes, and export previews should expand/collapse smoothly.
- Respect reduced motion at the component layer. When reduced motion is requested, page/list animations should collapse to static or near-instant opacity changes while preserving focus, selection, and layout behavior.
- Validate visually in the browser. Motion quality depends on timing, viewport, and interaction feel, so implementation should include desktop, mobile, and reduced-motion browser checks in addition to automated tests.

## Risks / Trade-offs

- New dependency increases client bundle size -> Use modern `motion`, shared primitives, and `LazyMotion`/`domAnimation` instead of importing heavier features everywhere.
- Too much animation could make a reflective product feel noisy -> Keep durations restrained, translations small, and effects tied to navigation, state, or hierarchy.
- Route transitions can conflict with Next App Router rendering -> Animate stable client wrappers around content, not server-only layout boundaries.
- Layout animations can cause jank in dense grids -> Use stable card dimensions, avoid animating expensive properties, and verify library filtering on desktop and mobile.
- Reduced-motion behavior can be missed if variants are duplicated -> Centralize reduced-motion decisions in shared helpers/wrappers.

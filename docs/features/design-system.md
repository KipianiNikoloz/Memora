# Homepage and Design System

Memora's visual system is a warm library on parchment.

Anchors:

- Parchment background.
- Burgundy headings and primary actions.
- Terracotta, gold, dusty rose, and teal accents.
- Serif display type for literary identity.
- Sans UI text for clarity.
- Cards and panels with restrained 8px radius.

The homepage must communicate "Every life deserves a library" in the first viewport.

## Implementation

- `app/globals.css` holds design tokens, layout primitives, responsive rules, and feature styling.
- `components/Brand.tsx`, `TopNav.tsx`, `AppChrome.tsx`, and `AppSidebar.tsx` define shared navigation and shell structure.
- `components/Motion.tsx` centralizes Motion primitives, reduced-motion handling, and page/list/card transitions.
- `components/LibraryIllustration.tsx` provides the branded homepage visual.

## Interface Constraints

- App surfaces should stay calm, scannable, and work-focused.
- Cards and panels should use restrained radii and avoid nested-card layouts.
- Motion should clarify state changes without changing content hierarchy.
- Mobile layouts must avoid horizontal overflow and preserve navigation access.

## Tests

- `tests/e2e/memora.spec.ts` includes desktop and mobile coverage for navigation, core flows, and horizontal overflow.
- `npm run lint` protects component/type contracts used by shared UI.

Related OpenSpec change:

- `implement-public-home-and-design-system`

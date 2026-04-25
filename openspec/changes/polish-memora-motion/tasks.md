## 1. Dependency And Motion Foundation

- [x] 1.1 Add the modern `motion` package dependency.
- [x] 1.2 Create shared motion helpers for page, list, panel, card, control, reveal, and reduced-motion behavior.
- [x] 1.3 Wrap the client app with a reusable Motion/LazyMotion provider where appropriate.
- [x] 1.4 Extend global styling for motion-safe transitions, focus stability, active navigation states, and reduced-motion fallbacks.

## 2. Shared Chrome And Controls

- [x] 2.1 Add stable main-content route/page transitions in app chrome while keeping top nav and sidebar stable.
- [x] 2.2 Add active, hover, focus, and tap motion to top navigation, sidebar links, brand mark, buttons, chips, and entry-card links.
- [x] 2.3 Ensure disabled and loading controls retain readable static states and do not shift surrounding layout.

## 3. Page-Specific Motion Polish

- [x] 3.1 Animate the homepage hero, shelf books, library preview, homepage cards, and section reveals.
- [x] 3.2 Animate auth mode switching, auth form feedback, and submit loading state.
- [x] 3.3 Animate library filtering, shelf group reflow, entry-card layout changes, AI Librarian aside actions, and empty states.
- [x] 3.4 Animate the new-entry form sections, selected emotion/tone chips, save state, and transition into the entry detail page.
- [x] 3.5 Animate entry detail content panels, AI reflection panel, back action, and delete loading state.
- [x] 3.6 Animate insights panels, low-data messaging, mood stat bars, milestone/revisit items, and AI summary updates.
- [x] 3.7 Animate librarian query/tone changes, response replacement, matched chapter action, and empty-library state.
- [x] 3.8 Animate settings tone saving feedback and export preview expansion/collapse.

## 4. Accessibility And Responsive Verification

- [x] 4.1 Implement and manually verify reduced-motion behavior for all new motion primitives and page-specific animations.
- [x] 4.2 Verify desktop viewport behavior for page transitions, filtering, forms, insights, librarian, and settings export.
- [x] 4.3 Verify mobile viewport behavior for the same surfaces, ensuring text and controls do not overlap.
- [x] 4.4 Confirm keyboard focus indicators remain visible and interactions remain usable without hover.

## 5. Automated Verification

- [x] 5.1 Run `npm run lint`.
- [x] 5.2 Run `npm test`.
- [x] 5.3 Run `npm run test:e2e`.
- [x] 5.4 Run `openspec validate polish-memora-motion --strict` and document any blocker if validation cannot complete.

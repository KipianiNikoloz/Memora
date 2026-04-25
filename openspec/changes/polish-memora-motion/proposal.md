## Why

Memora's visual design is warm and cohesive, but the frontend currently feels static. A calm motion system will make the library metaphor feel more tactile, clarify state changes, and improve perceived quality without changing product behavior.

## What Changes

- Add a full frontend motion polish pass across public and authenticated Memora surfaces.
- Introduce route/page transitions, staggered reveals, tactile interactive states, layout animations, and page-specific motion moments.
- Add reduced-motion behavior so users who prefer less motion still get a stable, usable interface.
- Use motion to support the existing calm literary design rather than adding decorative spectacle.
- Preserve existing routes, data behavior, auth behavior, validation, AI behavior, and copy.

## Capabilities

### New Capabilities

- `frontend-motion`: Provides Memora's app-wide motion language, route/page transitions, interactive microinteractions, page-specific animation behavior, and reduced-motion support.

### Modified Capabilities

- None.

## Impact

- Adds the modern `motion` React animation dependency.
- Touches shared app chrome, navigation, page components, library cards, forms, insights, librarian response UI, settings export UI, and global styling.
- Requires desktop, mobile, interaction, and reduced-motion browser verification.

## ADDED Requirements

### Requirement: Mode-separated runtime storage
The system SHALL use localStorage only in demo mode and Supabase only in production mode.

#### Scenario: Demo mode persistence
- **WHEN** `NEXT_PUBLIC_MEMORA_DEMO_MODE` is `true` or unset
- **THEN** Memora seeds representative demo data and persists app state to localStorage

#### Scenario: Production mode persistence
- **WHEN** `NEXT_PUBLIC_MEMORA_DEMO_MODE` is `false`
- **THEN** Memora uses Supabase Auth and database persistence for private app state

### Requirement: Production Supabase authentication
The system SHALL support Supabase email/password sign-in and account creation in production mode.

#### Scenario: User signs in with password
- **WHEN** a production-mode user submits valid credentials on the sign-in tab
- **THEN** the app calls Supabase `signInWithPassword` and routes an established session to the library

#### Scenario: User creates account with confirmation enabled
- **WHEN** a production-mode user signs up and Supabase does not return a session
- **THEN** the app shows a check-email state instead of treating the user as signed in

### Requirement: Supabase memory entry CRUD
The system SHALL persist authenticated memory entry create, read, update, and delete operations to `memory_entries`.

#### Scenario: User creates a memory
- **WHEN** an authenticated production-mode user saves a valid entry
- **THEN** Memora writes the entry to Supabase and reflects the saved row in the in-memory library list

#### Scenario: User deletes a memory
- **WHEN** an authenticated production-mode user deletes an entry
- **THEN** Memora deletes the matching Supabase row and removes it from the library list

### Requirement: Supabase profile tone persistence
The system SHALL persist the authenticated user's default AI tone to `memora_profiles`.

#### Scenario: User changes default tone
- **WHEN** an authenticated production-mode user selects a different default tone
- **THEN** Memora upserts the user's profile row with the selected tone

### Requirement: Production route protection
The system SHALL protect authenticated app routes in production mode.

#### Scenario: Unauthenticated production app route visit
- **WHEN** a production-mode visitor without a session opens an authenticated app route
- **THEN** the client redirects them to `/auth` after session resolution

### Requirement: Production verification
The system SHALL include verification guidance that proves Supabase is used in production mode.

#### Scenario: Deployment verification
- **WHEN** Memora is deployed with `NEXT_PUBLIC_MEMORA_DEMO_MODE=false`
- **THEN** the verification checklist confirms auth, `memory_entries` database rows, and browser network calls to `*.supabase.co`

## ADDED Requirements

### Requirement: Email authentication
The system SHALL allow users to create an account, log in, log out, and restore sessions using Supabase Auth.

#### Scenario: User signs in
- **WHEN** a user completes the email auth flow successfully
- **THEN** the app establishes a session and routes the user into the authenticated app area

### Requirement: Protected app routes
The system SHALL prevent unauthenticated users from accessing authenticated Memora app routes.

#### Scenario: Unauthenticated app access
- **WHEN** an unauthenticated visitor requests a protected app route
- **THEN** the app redirects them to the auth flow

### Requirement: Private data baseline
The system SHALL enforce user ownership for private data through Supabase Row Level Security.

#### Scenario: Cross-user data access is denied
- **WHEN** one authenticated user attempts to access another user's private records
- **THEN** Supabase policies deny the access

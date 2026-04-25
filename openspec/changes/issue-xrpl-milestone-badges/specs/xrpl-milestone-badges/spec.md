## ADDED Requirements

### Requirement: Milestone badge eligibility
The system SHALL allow XRPL milestone badges only for authenticated user-owned entries that are Proud or on the Milestones shelf.

#### Scenario: Eligible milestone appears
- **WHEN** an authenticated user views a Proud or Milestones entry
- **THEN** Memora shows a user-confirmed badge issue action

#### Scenario: Non-eligible entry appears
- **WHEN** an entry is not Proud and not on the Milestones shelf
- **THEN** Memora does not offer XRPL badge issuance

### Requirement: Testnet non-transferable NFT issuance
The system SHALL issue milestone badges as XRPL Testnet non-transferable NFTs.

#### Scenario: User confirms badge issuance
- **WHEN** the user confirms issuing a badge for an eligible entry
- **THEN** Memora mints an XRPL NFT without the transferable flag, creates a zero-XRP destination offer for the demo recipient wallet, accepts the offer, and stores validated transaction results

### Requirement: Private-safe badge metadata
The system SHALL publish only minimal badge metadata for XRPL NFTs.

#### Scenario: Badge metadata is created
- **WHEN** Memora prepares NFT metadata
- **THEN** the metadata includes only generic badge name, category, event date, and Memora issuer label
- **AND** excludes memory text, lesson, AI response, email, user id, private tags, and emotional narrative

### Requirement: Badge persistence
The system SHALL persist badge lifecycle state separately from memory entries.

#### Scenario: Badge state changes
- **WHEN** a badge is pending, issued, or failed
- **THEN** Memora records the badge status, related entry id, user id, XRPL account addresses, token id when available, transaction hashes, metadata URI, timestamps, and error summary

### Requirement: Demo wallet support
The system SHALL support a clearly labeled XRPL Testnet demo recipient wallet.

#### Scenario: Demo user prepares to receive a badge
- **WHEN** the user opens the badge wallet area
- **THEN** Memora can create or restore a testnet recipient wallet for demo badge ownership

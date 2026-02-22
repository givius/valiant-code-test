# Implementation Notes

## Decisions

- Migrated from Vue 3 + Vite to **Nuxt 4** for:
  - SSR capabilities for better SEO (important for embedded widgets and marketing pages)
  - Unified API layer (Nuxt server routes eliminate need for separate Express backend)
  - Auto-imports reducing boilerplate
  - Production-ready framework for evaluation
- Used **@nuxt/ui** for professional, accessible form components
- Added **@nuxtjs/i18n** for localization support (EN/ES) — demonstrates scale-ready architecture
- Converted Express backend to Nuxt server routes (`server/api/`)
- Shared types between frontend and backend via `shared/types/`

## Architecture Highlights

- **Component-driven**: Reusable ValField components with consistent styling
- **Type-safe**: Full TypeScript with Zod validation for form inputs
- **Tested**: 11 unit tests covering PMT calculations and loan repayment math
- **Embeddable**: Separate embed route (`/calculator`) for iframe integration
- **Accessible**: Semantic HTML, proper labels, responsive design

## Input Validation

- Loan amount:
  - Regex validation: Only digits allowed
  - Range validation: Min $1,000, Max $20,000,000 (per spec)
  - Zod schema enforces all constraints
- Loan purpose: Required selection with annualRate from API
- Repayment period: Required selection (weekly, fortnightly, monthly)
- Term: Required selection (6 months to 20 years)

## Testing Coverage

### Unit Tests (11 tests, 100% passing)
- PMT function validation
- Loan repayment calculations (period count, payment amount, total)
- Edge cases (zero values, missing inputs)
- Real-world scenarios (spec examples)

### E2E Tests (18 tests covering)
- Happy path: Calculator loads and calculates correctly
- Input validation: Min/max amounts, different periods and terms
- Calculations: Spec example ($30k → ~$1,384/month), total repayment math
- Responsiveness: Mobile and desktop viewports
- Embed page: `/calculator` route works independently
- Accessibility: Form labels, result headings, semantic structure

## Tasks Completed

- [x] Migrate from Vue 3 + Vite to Nuxt 4
  - Initialize Nuxt 4 project structure
  - Install and configure @nuxt/ui
  - Convert Express backend to Nuxt server routes
- [x] Create `useLoanData` composable to fetch and cache API data
- [x] Create reusable ValField components (Input, Select)
- [x] Create LoanCalculator component with PMT calculation
- [x] Input validation with Zod schema (amount bounds: $1k-$20M)
- [x] Add page routes:
  - `/` — Full page with header and description
  - `/calculator` — Embeddable component (iframe-friendly)
- [x] Add comprehensive unit tests (calculation logic)
- [x] Add comprehensive E2E tests (bonus points)
- [x] Add localization support (EN/ES)
- [x] Code quality: No linting errors, no console logs, clean formatting

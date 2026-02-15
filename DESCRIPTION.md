# Implementation Notes

## Decisions

- Migrated from Vue 3 + Vite to **Nuxt 4** (see README for rationale)
- Used **@nuxt/ui** for a consistent, accessible component library
- Added **@nuxtjs/i18n** for localization support (EN/ES)
- Converted Express backend to Nuxt server routes (`server/api/`)
- Shared types between frontend and backend via `shared/types/`

## Tasks

- [x] Migrate from Vue 3 + Vite to Nuxt 4
  - Initialize Nuxt 4 project structure
  - Install and configure @nuxt/ui
  - Convert Express backend to Nuxt server routes
- [x] Create `useLoanData` composable to fetch and cache API data
- [x] Create reusable ValField components (Input, Select)
- [x] Create LoanCalculator component with PMT calculation
- [x] Add page routes:
  - `/` — Full page with header and description
  - `/calculator` — Embeddable component (iframe-friendly)
- [x] Add unit tests
- [x] Add E2E tests
- [x] Add localization support (EN/ES)

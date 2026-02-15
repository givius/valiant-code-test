# 🦁 Valiant Frontend Coding Challenge

Template for completing the Valiant Frontend Coding Challenge with Nuxt 4. Use this as a starting point for your solution, we have included some of the tooling we use at Valiant in our day-to-day work.

Dependencies include:
- [Nuxt 4](https://nuxt.com/)
- [Vue 3](https://vuejs.org/guide/introduction)
- [Nuxt UI](https://ui.nuxt.com/) (includes Tailwind CSS v4)
- [Nuxt i18n](https://i18n.nuxtjs.org/)
- [ESLint](https://eslint.org/) with [@nuxt/eslint](https://eslint.nuxt.com/)
- [Vitest](https://vitest.dev/)
- [Cypress](https://www.cypress.io/)

## 🚀 Getting Started

Requires Node 20 and NPM 10.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
app/
├── assets/css/     # Global CSS (Tailwind)
├── components/     # Vue components (auto-imported)
├── composables/    # Composables (auto-imported)
├── layouts/        # Layout components
├── pages/          # File-based routing
└── utils/          # Utility functions (auto-imported)
server/
└── api/            # API routes (replaces Express backend)
```

## 🏃‍♀️ Scripts
- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run generate` – Generate static site
- `npm run lint` – Lint the code
- `npm run lint:fix` – Lint and fix the code
- `npm run test:e2e` – Open Cypress
- `npm run test:unit` – Run Vitest unit tests

## 🔌 API Endpoints

The backend API routes are now built into Nuxt at `/api/`:
- `GET /api/loan-purposes` – Loan purpose options
- `GET /api/requested-repayment-periods` – Repayment period options
- `GET /api/requested-term-months` – Term length options

## 💡 Why Nuxt?

This project uses Nuxt instead of plain Vue for:

- **SSR out of the box** – Better SEO, faster initial load, no extra configuration
- **All-in-one framework** – Routing, server, build tooling bundled together; fewer dependencies and version conflicts
- **Auto-imports** – Components, composables, and utilities work without manual imports
- **Built-in API layer** – Server routes replace the need for a separate Express backend

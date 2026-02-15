import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'tests/e2e/specs/**',
    supportFile: 'tests/e2e/support/e2e.js',
  },
})

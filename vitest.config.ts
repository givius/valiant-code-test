import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/unit/**/*.spec.{js,ts}'],
  },
})

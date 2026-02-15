import { describe, it, expect } from 'vitest'
import PMT from '~/utils/PMT'

// I'm assuming this is a 3rd party library, therefore, no in-depth testing is required
describe('PMT (provided library)', () => {
  it('returns the expected result for a standard loan', () => {
    const result = PMT(0.1 / 12, 24, 30000)
    expect(Math.trunc(result)).toEqual(-1384)
  })
})

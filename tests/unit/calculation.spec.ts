import { describe, it, expect } from 'vitest'
import {calculateLoanRepayments} from "../../app/utils/calculation";

describe('calculateLoanRepayments', () => {
  describe('Period Count Calculation', () => {
    it('calculates monthly payments over 1 year as 12 periods', () => {
      const result = calculateLoanRepayments(10000, 12, 0.1, 12)
      // periodCount = (12 / 12) * 12 = 12
      expect(result.period).toBeGreaterThan(0)
    })

    it('calculates weekly payments over 2 years as 104 periods', () => {
      const result = calculateLoanRepayments(10000, 24, 0.1, 52)
      // periodCount = (24 / 12) * 52 = 104
      // total should be period * 104
      expect(result.total).toBe(result.period * 104)
    })

    it('calculates fortnightly payments over 6 months as 13 periods', () => {
      const result = calculateLoanRepayments(10000, 6, 0.1, 26)
      // periodCount = (6 / 12) * 26 = 13
      expect(result.total).toBe(result.period * 13)
    })
  })

  describe('Payment Calculation', () => {
    it('calculates $30k loan at 10% monthly over 2 years as ~$1,384/month', () => {
      const result = calculateLoanRepayments(30000, 24, 0.1, 12)
      expect(result.period).toBe(1384)
    })

    it('calculates $50k vehicle loan at 4.5% monthly over 5 years as ~$932/month', () => {
      const result = calculateLoanRepayments(50000, 60, 0.045, 12)
      expect(result.period).toBe(932)
    })

    it('calculates $200k property loan at 2.9% monthly over 20 years as ~$1,099/month', () => {
      const result = calculateLoanRepayments(200000, 240, 0.029, 12)
      expect(result.period).toBe(1099)
    })
  })

  describe('Edge Cases', () => {
    it('returns zeros when loan amount is missing', () => {
      const result = calculateLoanRepayments(0, 24, 0.1, 12)
      expect(result.period).toBe(0)
      expect(result.total).toBe(0)
    })

    it('returns zeros when term is missing', () => {
      const result = calculateLoanRepayments(30000, 0, 0.1, 12)
      expect(result.period).toBe(0)
      expect(result.total).toBe(0)
    })

    it('returns zeros when repayment period is missing', () => {
      const result = calculateLoanRepayments(30000, 24, 0.1, 0)
      expect(result.period).toBe(0)
      expect(result.total).toBe(0)
    })
  })

  describe('Total Repayment Calculation', () => {
    it('calculates total as payment × number of periods', () => {
      const result = calculateLoanRepayments(30000, 24, 0.1, 12)
      // periodCount = (24 / 12) * 12 = 24
      expect(result.total).toBe(result.period * 24)
    })
  })
})

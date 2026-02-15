import type { LoanPurpose, RepaymentPeriod, TermMonth } from '~~/shared/types/loan';

/**
 * Fetches and caches loan configuration data (purposes, repayment periods, terms).
 * Data is fetched once and shared across all components via Nuxt's useState.
 */
export const useLoanData = async () => {
  const loading = useState<boolean>('loan-loading', () => true)
  const loanPurposes = useState<LoanPurpose[]>('loan-purposes', () => [])
  const repaymentPeriods = useState<RepaymentPeriod[]>('loan-repayment-periods', () => [])
  const termMonths = useState<TermMonth[]>('loan-term-months', () => [])

  // Only fetch if data hasn't been loaded yet
  if (!loanPurposes.value.length) {
    loading.value = true
    const [purposes, periods, terms] = await Promise.all([
      $fetch<LoanPurpose[]>('/api/loan-purposes'),
      $fetch<RepaymentPeriod[]>('/api/requested-repayment-periods'),
      $fetch<TermMonth[]>('/api/requested-term-months'),
    ])

    loanPurposes.value = purposes
    repaymentPeriods.value = periods
    termMonths.value = terms
    loading.value = false
  }

  return {
    /** Available loan purpose options with their interest rates */
    loanPurposes,
    /** Payment frequency options (weekly, fortnightly, monthly) */
    repaymentPeriods,
    /** Loan duration options in months */
    termMonths,
    /** Loading state for data fetching */
    loading,
  }
}

/** Loan purpose with associated interest rate */
export interface LoanPurpose {
  label: string
  value: string
  annualRate: number
}

/** Payment frequency option (e.g., weekly = 52 payments/year) */
export interface RepaymentPeriod {
  label: string
  value: number
}

/** Loan term duration in months */
export interface TermMonth {
  label: string
  value: number
}

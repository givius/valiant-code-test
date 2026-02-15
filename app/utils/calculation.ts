/**
 * Calculates loan repayment amounts based on principal, term, rate, and payment frequency.
 *
 * Uses the PMT (Payment) formula to determine periodic payments.
 * Formula: periodCount = (termMonths / 12) * repaymentPeriod
 *          payment = PMT(annualRate / repaymentPeriod, periodCount, amount)
 *
 * @param amount - The principal loan amount
 * @param termMonths - The loan term in months
 * @param annualRate - The annual interest rate as a decimal (e.g., 0.05 for 5%)
 * @param repaymentPeriod - Number of payments per year (12 = monthly, 26 = fortnightly, 52 = weekly)
 * @returns An object containing the periodic payment amount and total repayment
 */
export const calculateLoanRepayments = (amount: number, termMonths: number, annualRate: number, repaymentPeriod: number) => {
    if (!repaymentPeriod || !termMonths || !amount) {
        return {
            period: 0,
            total: 0
        }
    }

    const periodCount = (termMonths / 12) * repaymentPeriod
    const payment = PMT(annualRate / repaymentPeriod, periodCount, amount)

    const period = Math.round(Math.abs(payment))
    const total = period * periodCount
    return {
        period,
        total,
    }
}
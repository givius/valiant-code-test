import type { RepaymentPeriod } from '~~/shared/types/loan'

export default defineEventHandler((): RepaymentPeriod[] => {
  return [
    {
      label: 'Weekly',
      value: 52,
    },
    {
      label: 'Fortnightly',
      value: 26,
    },
    {
      label: 'Monthly',
      value: 12,
    },
  ]
})

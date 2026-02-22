<script setup lang="ts">
/**
 * Loan repayment calculator with real-time PMT calculations.
 * Uses Zod for validation and i18n for translations.
 */
import * as z from 'zod'

const { loanPurposes, repaymentPeriods, termMonths, loading } = await useLoanData()

// Form validation schema (amount: $1,000 - $20M per spec)
const schema = z.object({
    amount: z
        .string()
        .regex(/^\d+$/, 'Must contain only digits')
        .transform(str => parseFloat(str))
        .refine(val => val >= 1000 && val <= 20000000, {
            message: 'Amount must be between $1,000 and $20,000,000',
        }),
    purpose: z.string().min(1, 'Purpose is required'),
    repaymentPeriod: z.number().min(1, 'Repayment period is required'),
    term: z.number().min(1, 'Term is required'),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
    amount: 0,
    purpose: '',
    repaymentPeriod: 0,
    term: 0,
})
const periodAmount = ref(0)
const totalAmount = ref(0)

// Provide form context to child ValField components
const modalForm = ref()
provide('val-modal-save', {
    form: modalForm,
    state: state,
    schema: schema,
})

// Set defaults once data loads
watch(loading, () => {
    state.purpose = loanPurposes.value?.[0]?.value
    state.repaymentPeriod = repaymentPeriods.value?.[0]?.value
    state.term = termMonths.value?.[0]?.value
}, { immediate: true })

// Recalculate repayments when inputs change
watch(state, (newState) => {
    const { amount, repaymentPeriod, term, purpose } = newState
    const annualRate = loanPurposes.value.find(loanPeriod => loanPeriod.value === purpose)?.annualRate ?? 0
    const { period, total } = calculateLoanRepayments(amount || '0', term || 0, annualRate, repaymentPeriod || 0)

    periodAmount.value = period
    totalAmount.value = total
})

const repaymentPeriodLabel = computed(() =>
    repaymentPeriods.value?.find(period => period.value === state.repaymentPeriod)?.label ?? ''
)
const strNumber = (value: number) => value.toLocaleString('en-US');
</script>

<template>
    <UForm
        ref="modalForm"
        :schema="schema"
        :state="state"
        class="val-calculator "
    >
        <div v-if="loading" class="flex gap-4">
            <USkeleton class="w-20 h-10" />
            <USkeleton class="w-30 h-10" />
            <USkeleton class="w-20 h-10" />
            <USkeleton class="w-40 h-10" />
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="flex gap-2 items-center">
                <ValFieldInput
                    name="amount"
                    label="calculator.amount"
                    type="text"
                    :min="1000"
                    :max="20000000"
                    icon="ph:currency-dollar"
                    @keyup="(e: KeyboardEvent) => {
                        // Allow only numbers and commas
                        const cleanedValue = e.target?.value?.replace(/[^0-9.]/g, '')
                        // Remove commas for parsing
                        const numericValue = parseFloat(cleanedValue.replace(/,/g, ''))
                        state.amount = isNaN(numericValue) ? 0 : cleanedValue
                    }"
                />
            </div>
            <div class="flex gap-2 items-center">
                <ValFieldSelect
                    name="purpose"
                    label="calculator.purpose"
                    :options="loanPurposes"
                />
            </div>
            <div class="flex gap-2 items-center">
                <ValFieldSelect
                    name="repaymentPeriod"
                    label="calculator.repayment-period"
                    :options="repaymentPeriods"
                />
            </div>
            <div class="flex gap-2 items-center">
                <ValFieldSelect
                    name="term"
                    label="calculator.term"
                    :options="termMonths"
                />
            </div>
        </div>

        <USeparator class="my-4" />

        <div class="flex flex-col gap-2">
            <i18n-t keypath="calculator.results.period" tag="h2" class="text-primary">
                <template #amount>
                    <b data-testid="period-amount">
                        {{ strNumber(periodAmount) }}
                    </b>
                </template>
                <template #period>
                    <b>{{ repaymentPeriodLabel }}</b>
                </template>
            </i18n-t>
            <i18n-t keypath="calculator.results.total" tag="h4" class="text-muted">
                <template #total>
                    <b data-testid="total-amount">
                        {{ strNumber(totalAmount) }}
                    </b>
                </template>
            </i18n-t>
        </div>
    </UForm>
</template>

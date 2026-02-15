describe('Loan Calculator - Full Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the page header and description', () => {
    cy.contains('Loan Repayment Calculator').should('be.visible')
    cy.contains('simple loan repayment calculator').should('be.visible')
  })

  it('calculates monthly repayments for a $30k loan over 2 years', () => {
    // Enter loan amount
    cy.get('input[type="number"]').clear().type('30000')

    // Select "Day-to-day capital" (10% rate)
    cy.contains('Day-to-day capital').click()

    // Select "Monthly" repayments
    cy.contains('Monthly').click()

    // Select "2 years" term
    cy.contains('2 years').click()

    // Verify the calculated payment (~$1,384/month)
    cy.contains('1,384').should('be.visible')
    cy.contains('Monthly').should('be.visible')

    // Verify total repayments (~$33,216)
    cy.contains('33,216').should('be.visible')
  })

  it('updates calculation when changing loan purpose', () => {
    cy.get('input[type="number"]').clear().type('50000')

    // Start with "Day-to-day capital" (10%)
    cy.contains('Day-to-day capital').click()
    cy.contains('Monthly').click()
    cy.contains('5 years').click()

    // Note the higher payment at 10%
    cy.contains('1,062').should('be.visible')

    // Switch to "Financing a property" (2.9% - lower rate)
    cy.contains('Financing a property').click()

    // Payment should be lower with the reduced rate
    cy.contains('897').should('be.visible')
  })
})

describe('Loan Calculator - Embeddable Component', () => {
  beforeEach(() => {
    cy.visit('/calculator')
  })

  it('loads without page header (iframe-friendly)', () => {
    // Should NOT have the full page header
    cy.contains('Loan Repayment Calculator').should('not.exist')

    // Calculator should still be functional
    cy.get('input[type="number"]').should('be.visible')
  })

  it('calculates repayments in isolation', () => {
    cy.get('input[type="number"]').clear().type('100000')

    // Select options
    cy.contains('Vehicle or transport').click()
    cy.contains('Fortnightly').click()
    cy.contains('3 years').click()

    // Verify calculation displays
    cy.get('h2').should('contain', 'Fortnightly')
    cy.get('h4').should('be.visible') // Total repayments
  })

  it('shows zero when amount is empty', () => {
    cy.get('input[type="number"]').clear()

    // Should show 0 for both period and total
    cy.contains('0').should('be.visible')
  })
})

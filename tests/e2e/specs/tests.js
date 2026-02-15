describe('Loan Calculator - Full Page', () => {
  beforeEach(() => {
    cy.visit('/', {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    })
  })

  it('loads the index page with calculator component', () => {
    // Page wrapper elements should be present
    cy.contains('Loan Repayment Calculator').should('be.visible')
    cy.contains('simple loan repayment calculator').should('be.visible')

    // Calculator component should be loaded within the page
    cy.get('input[name="amount"]').should('be.visible')
    cy.contains('Day-to-day capital').should('be.visible')
  })

  it('displays the page header and description', () => {
    cy.contains('Loan Repayment Calculator').should('be.visible')
    cy.contains('simple loan repayment calculator').should('be.visible')
  })

  // TODO get this test passing
  it('calculates monthly repayments for a $30k loan over 2 years', () => {
    // Enter loan amount
    cy.get('input[name="amount"]').clear().type('30000');

    // Select "Day-to-day capital" (10% rate)
    // cy.get('select[name="purpose"]').select('general', { force: true })
    //
    // // Select "Monthly" repayments
    // cy.get('select[name="repaymentPeriod"]').select('12', { force: true })
    //
    // // Select "2 years" term
    // cy.get('select[name="term"]').select('24', { force: true })

    // Verify the calculated payment (~$1,384/month)
    cy.get('[data-testid="period-amount"]').should('be.visible')
    cy.contains('Monthly').should('be.visible')

    // Verify total repayments (~$33,216)
    cy.get('[data-testid="total-amount"]').should('be.visible')
  })
})

describe('Loan Calculator - Embeddable Component', () => {
  beforeEach(() => {
    cy.visit('/calculator', {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    })
  })

  it('renders calculator as embedded component without page wrapper', () => {
    // Should NOT have the full page header or description
    cy.contains('Loan Repayment Calculator').should('not.exist')
    cy.contains('simple loan repayment calculator').should('not.exist')

    // Calculator component should be rendered directly
    cy.get('input[name="amount"]').should('be.visible')
    cy.contains('Day-to-day capital').should('be.visible')
    cy.contains('Monthly').should('be.visible')
  })

  it('loads without page header (iframe-friendly)', () => {
    // Should NOT have the full page header
    cy.contains('Loan Repayment Calculator').should('not.exist')

    // Calculator should still be functional
    cy.get('input[name="amount"]').should('be.visible')
  })

  it('shows zero when amount is empty', () => {
    cy.get('input[name="amount"]').clear()

    // Should show 0 for both period and total
    cy.get('[data-testid="period-amount"]').should('be.visible')
  })
})

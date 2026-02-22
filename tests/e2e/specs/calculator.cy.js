describe('Loan Calculator E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Happy Path - Calculator Loads and Works', () => {
    it('should load the calculator on the home page', () => {
      cy.get('[class*="val-calculator"]').should('exist')
    })

    it('should display all input fields', () => {
      cy.contains('I need').should('exist')
      cy.contains('For').should('exist')
      cy.contains('Repaid').should('exist')
      cy.contains('Over').should('exist')
    })

    it('should calculate loan repayment for a basic scenario', () => {
      // Enter $30,000 loan
      cy.get('input[type="text"]').first().clear().type('30000')
      
      // Select "Day-to-day capital" (default, 10% rate)
      cy.get('select').eq(0).should('have.value', 'general')
      
      // Select "Monthly" repayment (should be default)
      cy.get('select').eq(1).should('have.value', '12')
      
      // Select "2 years" term (should be default)
      cy.get('select').eq(2).should('have.value', '24')
      
      // Verify the period amount is displayed
      cy.get('[data-testid="period-amount"]').should('exist')
      cy.get('[data-testid="period-amount"]').should('not.be.empty')
      
      // Verify total amount is displayed
      cy.get('[data-testid="total-amount"]').should('exist')
      cy.get('[data-testid="total-amount"]').should('not.be.empty')
    })

    it('should calculate different repayment for different loan purposes', () => {
      // Set initial values
      cy.get('input[type="text"]').first().clear().type('50000')
      cy.get('select').eq(2).select('60') // 5 years
      
      // Get initial monthly amount with default purpose
      cy.get('[data-testid="period-amount"]')
        .then(($el) => {
          const initialAmount = $el.text()
          
          // Change purpose to "Vehicle or transport" (lower rate 4.5%)
          cy.get('select').eq(0).select('vehicle')
          
          // Monthly payment should be lower with lower interest rate
          cy.get('[data-testid="period-amount"]').should('not.contain', initialAmount)
        })
    })

    it('should update calculations when loan amount changes', () => {
      cy.get('select').eq(2).select('24') // 2 years
      
      // Enter $10,000
      cy.get('input[type="text"]').first().clear().type('10000')
      cy.get('[data-testid="period-amount"]').then(($el) => {
        const smallAmount = $el.text()
        
        // Enter $20,000
        cy.get('input[type="text"]').first().clear().type('20000')
        cy.get('[data-testid="period-amount"]').should('not.contain', smallAmount)
      })
    })

    it('should display results with proper formatting', () => {
      cy.get('input[type="text"]').first().clear().type('30000')
      
      // Results should be visible and contain currency-like formatting
      cy.get('[data-testid="period-amount"]').should('contain', /\d/)
      cy.get('[data-testid="total-amount"]').should('contain', /\d/)
    })
  })

  describe('Edge Cases and Validation', () => {
    it('should handle minimum loan amount (1000)', () => {
      cy.get('input[type="text"]').first().clear().type('1000')
      cy.get('[data-testid="period-amount"]').should('exist')
    })

    it('should handle large loan amount (20000000)', () => {
      cy.get('input[type="text"]').first().clear().type('20000000')
      cy.get('[data-testid="period-amount"]').should('exist')
    })

    it('should handle different repayment periods', () => {
      cy.get('input[type="text"]').first().clear().type('30000')
      
      // Test weekly
      cy.get('select').eq(1).select('52')
      cy.get('[data-testid="period-amount"]').then(($el) => {
        const weeklyAmount = $el.text()
        
        // Test monthly - should be higher
        cy.get('select').eq(1).select('12')
        cy.get('[data-testid="period-amount"]').should('not.contain', weeklyAmount)
      })
    })

    it('should handle different loan terms', () => {
      cy.get('input[type="text"]').first().clear().type('30000')
      
      // Test 6 months
      cy.get('select').eq(2).select('6')
      cy.get('[data-testid="period-amount"]').then(($el) => {
        const shortTermAmount = $el.text()
        
        // Test 5 years - should be lower
        cy.get('select').eq(2).select('60')
        cy.get('[data-testid="period-amount"]').should('not.contain', shortTermAmount)
      })
    })

    it('should handle numeric input without commas', () => {
      cy.get('input[type="text"]').first().clear().type('5000')
      cy.get('[data-testid="period-amount"]').should('exist')
    })
  })

  describe('Embed Page (iframe-friendly)', () => {
    it('should load calculator on /calculator embed page', () => {
      cy.visit('/calculator')
      cy.get('[class*="val-calculator"]').should('exist')
      cy.get('[data-testid="period-amount"]').should('exist')
    })

    it('should work independently on embed page', () => {
      cy.visit('/calculator')
      cy.get('input[type="text"]').first().clear().type('30000')
      cy.get('[data-testid="period-amount"]').should('not.be.empty')
    })
  })

  describe('Accessibility and UI', () => {
    it('should have proper form labels', () => {
      cy.contains('I need').should('be.visible')
      cy.contains('For').should('be.visible')
      cy.contains('Repaid').should('be.visible')
      cy.contains('Over').should('be.visible')
    })

    it('should display results with proper headings', () => {
      cy.get('input[type="text"]').first().clear().type('30000')
      
      // Check for result headings
      cy.get('h2').should('exist')
      cy.get('h4').should('exist')
    })

    it('should maintain responsive layout', () => {
      // Test on mobile
      cy.viewport('iphone-x')
      cy.get('[class*="val-calculator"]').should('be.visible')
      cy.get('input[type="text"]').first().clear().type('30000')
      cy.get('[data-testid="period-amount"]').should('be.visible')
      
      // Test on desktop
      cy.viewport('macbook-15')
      cy.get('[data-testid="period-amount"]').should('be.visible')
    })
  })

  describe('Real-world Scenarios', () => {
    it('should match spec example: $30k at 10% over 2 years monthly = ~$1,384/month', () => {
      cy.get('input[type="text"]').first().clear().type('30000')
      cy.get('select').eq(0).select('general') // 10% rate
      cy.get('select').eq(1).select('12') // Monthly
      cy.get('select').eq(2).select('24') // 2 years
      
      // The monthly payment should be around $1,384
      cy.get('[data-testid="period-amount"]').should('contain', '1')
      cy.get('[data-testid="period-amount"]').invoke('text').then((text) => {
        const amount = parseInt(text.replace(/[^0-9]/g, ''))
        expect(amount).to.be.closeTo(1384, 50) // Allow 50 dollar margin
      })
    })

    it('should calculate correct total repayment', () => {
      cy.get('input[type="text"]').first().clear().type('30000')
      cy.get('select').eq(0).select('general')
      cy.get('select').eq(1).select('12') // Monthly
      cy.get('select').eq(2).select('24') // 2 years, so 24 payments
      
      // Get period amount and total, verify total = period * 24
      cy.get('[data-testid="period-amount"]').invoke('text').then((periodText) => {
        const periodAmount = parseInt(periodText.replace(/[^0-9]/g, ''))
        
        cy.get('[data-testid="total-amount"]').invoke('text').then((totalText) => {
          const totalAmount = parseInt(totalText.replace(/[^0-9]/g, ''))
          // Total should be approximately period * 24 (accounting for rounding)
          expect(totalAmount).to.be.closeTo(periodAmount * 24, periodAmount)
        })
      })
    })
  })
})

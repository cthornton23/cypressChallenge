/// <reference types="cypress" />

context('Test', () => {
    const username = 'charles.thornton@zombiefox.us'
    const password = 'wCoO6wg0!83!'
    
    it('navigates to login page and logs in', () => {
        cy.visit('https://app.gogrow.com/login')
        cy.get('.STATIC-logIn-email')
        .type(username)
        .should('have.value', username)
        cy.get('.STATIC-logIn-password')
        .type(password)
        .should('have.value', password)
        cy.get('.sign-in')
        .click()
    })

    it('asserts the correct title', () => {
        cy.title().should('eq', 'Grow | Sales Dash')
    })

    it('mouseOvers graph and expands', () => {
        cy.get('.focusValues---focusValuesContainer---2MUyk')
        .trigger('mouseover')
        .click()
        // The following commands ALL FAIL because the site logs out with a 401 error on one of the data APIs. 
        // This is how the rest of the test would proceed.
        cy.get('div.topBar---topBar---2Y8S5 > div.topBar---title---nQgm9')
          .contains('text', 'Sales by Month')
        cy.get('topBar---closeButton---2K74G').click()
    })

    it('logs out', () => {
        cy.get('.avatar---initials---3gz8C').click()
        cy.get('STATIC-globalNav-accountUserSettings-logout').click()
        cy.url()
            .should('include', '/login')
    })
})
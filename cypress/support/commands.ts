/// <reference types="cypress" />

// Add custom commands here

declare global {
    namespace Cypress {
        interface Chainable {
            waitForProducts(): Chainable<void>
            searchProducts(searchTerm: string): Chainable<void>
            sortProducts(order: 'asc' | 'desc'): Chainable<void>
            verifyProductCard(name: string, price: number): Chainable<void>
        }
    }
}

Cypress.Commands.add('waitForProducts', () => {
    cy.wait('@getProducts')
    cy.get('[data-testid="product-card"]').should('have.length', 12)
})

Cypress.Commands.add('searchProducts', (searchTerm: string) => {
    cy.get('[data-testid="search-input"]').clear().type(searchTerm)
})

Cypress.Commands.add('sortProducts', (order: 'asc' | 'desc') => {
    cy.get('[data-testid="sort-button"]').click()
    if (order === 'desc') {
        cy.get('[data-testid="sort-button"]').should('contain.text', 'High to Low')
    } else {
        cy.get('[data-testid="sort-button"]').should('contain.text', 'Low to High')
    }
})

Cypress.Commands.add('verifyProductCard', (name: string, price: number) => {
    cy.contains(name).should('be.visible')
    cy.contains(`$${price.toFixed(2)}`).should('be.visible')
    cy.get(`img[alt="${name}"]`).should('be.visible')
})

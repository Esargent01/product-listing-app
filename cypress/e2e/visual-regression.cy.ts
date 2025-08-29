describe('Visual Regression Tests', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:5001/api/v1/products', {
            fixture: 'products.json'
        }).as('getProducts')

        cy.visit('/')
        cy.waitForProducts()
    })

    describe('Layout Consistency', () => {
        it('should maintain consistent header layout', () => {
            cy.get('header').should('be.visible')
            cy.get('h1').should('contain', 'Product Store')
            cy.get('header').should('have.css', 'position', 'static')
        })

        it('should maintain consistent main content layout', () => {
            cy.get('main').should('be.visible')
            cy.get('.container').should('be.visible')
            cy.get('.controls').should('be.visible')
            cy.get('.products-container').should('be.visible')
        })

        it('should maintain consistent footer layout', () => {
            cy.get('footer').should('be.visible')
            cy.get('[data-testid="total-products"]').should('be.visible')
            cy.get('[data-testid="average-price"]').should('be.visible')
        })
    })

    describe('Product Grid Layout', () => {
        it('should display products in a grid layout', () => {
            cy.get('.products-grid').should('be.visible')
            cy.get('[data-testid="product-card"]').should('have.length', 12)

            // Check that cards are displayed in a grid
            cy.get('.products-grid').should('have.css', 'display', 'grid')
        })

        it('should maintain consistent card spacing', () => {
            cy.get('[data-testid="product-card"]').each(($card) => {
                cy.wrap($card).should('have.css', 'border-radius')
                cy.wrap($card).should('have.css', 'box-shadow')
            })
        })
    })

    describe('Responsive Layout', () => {
        it('should adapt layout for mobile devices', () => {
            cy.viewport(375, 667)

            cy.get('[data-testid="search-input"]').should('be.visible')
            cy.get('[data-testid="sort-button"]').should('be.visible')
            cy.get('[data-testid="product-card"]').should('have.length', 12)

            // Check that controls are stacked vertically on mobile
            cy.get('.controls').should('have.css', 'flex-direction', 'column')
        })

        it('should adapt layout for tablet devices', () => {
            cy.viewport(768, 1024)

            cy.get('[data-testid="search-input"]').should('be.visible')
            cy.get('[data-testid="sort-button"]').should('be.visible')
            cy.get('[data-testid="product-card"]').should('have.length', 12)
        })

        it('should adapt layout for desktop devices', () => {
            cy.viewport(1280, 720)

            cy.get('[data-testid="search-input"]').should('be.visible')
            cy.get('[data-testid="sort-button"]').should('be.visible')
            cy.get('[data-testid="product-card"]').should('have.length', 12)

            // Check that controls are in a row on desktop
            cy.get('.controls').should('have.css', 'flex-direction', 'row')
        })
    })

    describe('Interactive Elements', () => {
        it('should have consistent button styling', () => {
            cy.get('[data-testid="sort-button"]').should('be.visible')
            cy.get('[data-testid="sort-button"]').should('have.css', 'cursor', 'pointer')
            cy.get('[data-testid="sort-button"]').should('have.css', 'border-radius')
        })

        it('should have consistent input styling', () => {
            cy.get('[data-testid="search-input"]').should('be.visible')
            cy.get('[data-testid="search-input"]').should('have.attr', 'placeholder')
            cy.get('[data-testid="search-input"]').should('have.css', 'border-radius')
        })

        it('should show hover states for interactive elements', () => {
            cy.get('[data-testid="sort-button"]').trigger('mouseover')
            cy.get('[data-testid="sort-button"]').should('be.visible')

            cy.get('[data-testid="search-input"]').focus()
            cy.get('[data-testid="search-input"]').should('be.visible')
        })
    })

    describe('Loading and Error States', () => {
        it('should display loading state consistently', () => {
            cy.intercept('GET', 'http://localhost:5001/api/v1/products', {
                delay: 1000,
                statusCode: 200,
                body: {
                    success: true,
                    count: 3,
                    total: 3,
                    data: []
                }
            }).as('slowProducts')

            cy.visit('/')
            cy.contains('Loading products...').should('be.visible')
            cy.get('.spinner').should('be.visible')
        })

        it('should display error state consistently', () => {
            cy.intercept('GET', 'http://localhost:5001/api/v1/products', {
                statusCode: 500,
                body: { message: 'Internal Server Error' }
            }).as('errorProducts')

            cy.visit('/')
            cy.wait('@errorProducts')

            cy.contains('Error').should('be.visible')
            cy.get('.error').should('be.visible')
        })

        it('should display no results state consistently', () => {
            cy.searchProducts('nonexistent')

            cy.contains('No products found').should('be.visible')
            cy.get('.no-results').should('be.visible')
            cy.get('.fa-search').should('be.visible')
        })
    })

    describe('Typography and Colors', () => {
        it('should maintain consistent typography', () => {
            cy.get('h1').should('have.css', 'font-weight')
            cy.get('h1').should('have.css', 'font-size')

            cy.get('[data-testid="product-card"]').first().within(() => {
                cy.get('h3').should('have.css', 'font-weight')
                cy.get('p').should('have.css', 'font-size')
            })
        })

        it('should maintain consistent color scheme', () => {
            cy.get('body').should('have.css', 'background-color')
            cy.get('[data-testid="product-card"]').first().should('have.css', 'background-color')
        })
    })

    describe('Image Display', () => {
        it('should display product images consistently', () => {
            cy.get('img').should('have.length', 12)

            cy.get('img').each(($img) => {
                cy.wrap($img).should('be.visible')
                cy.wrap($img).should('have.attr', 'alt')
                cy.wrap($img).should('have.css', 'border-radius')
            })
        })

        it('should handle image loading states', () => {
            cy.get('img').each(($img) => {
                cy.wrap($img).should('have.attr', 'src')
                cy.wrap($img).should('be.visible')
            })
        })
    })
})

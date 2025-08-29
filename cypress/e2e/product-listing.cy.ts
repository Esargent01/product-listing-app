describe('Product Listing Application', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:5001/api/v1/products', {
            fixture: 'products.json'
        }).as('getProducts')

        cy.visit('/')
    })

    describe('Page Load and Initial State', () => {
        it('should load the application successfully', () => {
            cy.get('h1').should('contain', 'Product Store')
            cy.get('[data-testid="search-input"]').should('be.visible')
            cy.get('[data-testid="sort-button"]').should('be.visible')
        })

        it('should display loading state initially', () => {
            cy.contains('Loading products...').should('be.visible')
        })

        it('should load and display all products', () => {
            cy.waitForProducts()

            cy.verifyProductCard('Wireless Bluetooth Headphones', 89.99)
            cy.verifyProductCard('Portable Bluetooth Speaker', 49.99)
            cy.verifyProductCard('Smart Fitness Watch', 199.99)
            cy.verifyProductCard('Ultra HD 4K Camera', 299.99)
            cy.verifyProductCard('Wireless Gaming Mouse', 79.99)
            cy.verifyProductCard('Mechanical Keyboard', 129.99)
            cy.verifyProductCard('External SSD Drive', 159.99)
            cy.verifyProductCard('Wireless Charging Pad', 39.99)
            cy.verifyProductCard('Smart Home Hub', 149.99)
            cy.verifyProductCard('Portable Power Bank', 29.99)
            cy.verifyProductCard('Wireless Earbuds', 119.99)
            cy.verifyProductCard('USB-C Hub', 69.99)
        })

        it('should display correct footer statistics', () => {
            cy.waitForProducts()

            cy.get('[data-testid="total-products"]').should('contain', '12')
            cy.get('[data-testid="average-price"]').should('contain', '$118.32')
        })
    })

    describe('Search Functionality', () => {
        beforeEach(() => {
            cy.waitForProducts()
        })

        it('should filter products by name', () => {
            cy.searchProducts('headphones')

            cy.get('[data-testid="product-card"]').should('have.length', 1)
            cy.verifyProductCard('Wireless Bluetooth Headphones', 89.99)
        })

        it('should filter products by description', () => {
            cy.searchProducts('fitness')

            cy.get('[data-testid="product-card"]').should('have.length', 1)
            cy.verifyProductCard('Smart Fitness Watch', 199.99)
        })

        it('should be case-insensitive', () => {
            cy.searchProducts('BLUETOOTH')

            cy.get('[data-testid="product-card"]').should('have.length', 2)
            cy.verifyProductCard('Wireless Bluetooth Headphones', 89.99)
            cy.verifyProductCard('Portable Bluetooth Speaker', 49.99)
        })

        it('should show no results for non-existent search', () => {
            cy.searchProducts('nonexistent')

            cy.get('[data-testid="product-card"]').should('have.length', 0)
            cy.contains('No products found').should('be.visible')
            cy.contains('Try adjusting your search terms').should('be.visible')
        })

        it('should clear search and show all products', () => {
            cy.searchProducts('headphones')
            cy.get('[data-testid="product-card"]').should('have.length', 1)

            cy.get('[data-testid="search-input"]').clear()
            cy.get('[data-testid="product-card"]').should('have.length', 12)
        })

        it('should handle partial search terms', () => {
            cy.searchProducts('headphones')

            cy.get('[data-testid="product-card"]').should('have.length', 1)
            cy.verifyProductCard('Wireless Bluetooth Headphones', 89.99)
        })
    })

    describe('Sorting Functionality', () => {
        beforeEach(() => {
            cy.waitForProducts()
        })

        it('should sort products by price ascending by default', () => {
            cy.get('[data-testid="product-card"]').first().should('contain', 'Portable Power Bank')
            cy.get('[data-testid="product-card"]').last().should('contain', 'Ultra HD 4K Camera')
        })

        it('should sort products by price descending when clicked', () => {
            cy.sortProducts('desc')

            cy.get('[data-testid="product-card"]').first().should('contain', 'Ultra HD 4K Camera')
            cy.get('[data-testid="product-card"]').last().should('contain', 'Portable Power Bank')
        })

        it('should toggle back to ascending when clicked again', () => {
            cy.sortProducts('desc')
            cy.sortProducts('asc')

            cy.get('[data-testid="product-card"]').first().should('contain', 'Portable Power Bank')
            cy.get('[data-testid="product-card"]').last().should('contain', 'Ultra HD 4K Camera')
        })

        it('should maintain sort order during search', () => {
            cy.sortProducts('desc')
            cy.searchProducts('bluetooth')

            cy.get('[data-testid="product-card"]').should('have.length', 2)
            cy.get('[data-testid="product-card"]').first().should('contain', 'Wireless Bluetooth Headphones')
            cy.get('[data-testid="product-card"]').last().should('contain', 'Portable Bluetooth Speaker')
        })
    })

    describe('Product Card Details', () => {
        beforeEach(() => {
            cy.waitForProducts()
        })

        it('should display all product information correctly', () => {
            cy.get('[data-testid="product-card"]').first().within(() => {
                cy.contains('Portable Power Bank').should('be.visible')
                cy.contains('$29.99').should('be.visible')
                cy.contains('20,000mAh power bank with fast charging and multiple USB ports').should('be.visible')
                cy.get('img').should('be.visible')
            })
        })

        it('should have proper image attributes', () => {
            cy.get('img[alt="Portable Power Bank"]').should('be.visible')
            cy.get('img[alt="Wireless Charging Pad"]').should('be.visible')
        })

        it('should display prices with proper formatting', () => {
            cy.contains('$29.99').should('be.visible')
            cy.contains('$299.99').should('be.visible')
        })
    })

    describe('Responsive Design', () => {
        beforeEach(() => {
            cy.waitForProducts()
        })

        it('should display correctly on mobile viewport', () => {
            cy.viewport(375, 667)

            cy.get('[data-testid="search-input"]').should('be.visible')
            cy.get('[data-testid="sort-button"]').should('be.visible')
            cy.get('[data-testid="product-card"]').should('have.length', 12)
        })

        it('should display correctly on tablet viewport', () => {
            cy.viewport(768, 1024)

            cy.get('[data-testid="search-input"]').should('be.visible')
            cy.get('[data-testid="sort-button"]').should('be.visible')
            cy.get('[data-testid="product-card"]').should('have.length', 12)
        })

        it('should display correctly on desktop viewport', () => {
            cy.viewport(1280, 720)

            cy.get('[data-testid="search-input"]').should('be.visible')
            cy.get('[data-testid="sort-button"]').should('be.visible')
            cy.get('[data-testid="product-card"]').should('have.length', 12)
        })
    })

    describe('Error Handling', () => {
        it('should handle API errors gracefully', () => {
            cy.intercept('GET', 'http://localhost:5001/api/v1/products', {
                statusCode: 500,
                body: { message: 'Internal Server Error' }
            }).as('getProductsError')

            cy.visit('/')
            cy.wait('@getProductsError')

            cy.contains('Error').should('be.visible')
            cy.contains('HTTP error! status: 500').should('be.visible')
        })

        it('should handle network errors', () => {
            cy.intercept('GET', 'http://localhost:5001/api/v1/products', {
                forceNetworkError: true
            }).as('getProductsNetworkError')

            cy.visit('/')
            cy.wait('@getProductsNetworkError')

            cy.contains('Error').should('be.visible')
        })
    })

    describe('User Interaction Flow', () => {
        beforeEach(() => {
            cy.waitForProducts()
        })

        it('should allow complete user workflow: search, sort, and clear', () => {
            // Search for specific product
            cy.searchProducts('bluetooth')
            cy.get('[data-testid="product-card"]').should('have.length', 2)

            // Sort by price descending
            cy.sortProducts('desc')
            cy.get('[data-testid="product-card"]').first().should('contain', 'Wireless Bluetooth Headphones')

            // Clear search
            cy.get('[data-testid="search-input"]').clear()
            cy.get('[data-testid="product-card"]').should('have.length', 12)

            // Verify sort order is maintained
            cy.get('[data-testid="product-card"]').first().should('contain', 'Ultra HD 4K Camera')
        })

        it('should maintain focus on search input after interactions', () => {
            cy.get('[data-testid="search-input"]').click()
            cy.searchProducts('test')
            cy.get('[data-testid="search-input"]').should('have.focus')
        })
    })

    describe('Performance and Accessibility', () => {
        it('should load within reasonable time', () => {
            cy.visit('/', { timeout: 10000 })
            cy.waitForProducts()

            // Verify all content is loaded
            cy.get('[data-testid="product-card"]').should('have.length', 12)
            cy.get('img').should('have.length', 12)
        })

        it('should have proper semantic HTML structure', () => {
            cy.get('header').should('exist')
            cy.get('main').should('exist')
            cy.get('footer').should('exist')
        })

        it('should have accessible form elements', () => {
            cy.get('[data-testid="search-input"]').should('have.attr', 'placeholder')
            cy.get('[data-testid="sort-button"]').should('be.visible')
        })
    })
})

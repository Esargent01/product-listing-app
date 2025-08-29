/// <reference types="cypress" />

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Add global configuration
beforeEach(() => {
    // Intercept API calls to ensure consistent test data
    cy.intercept('GET', 'http://localhost:5001/api/v1/products', {
        statusCode: 200,
        body: {
            success: true,
            count: 3,
            total: 3,
            data: [
                {
                    _id: '1',
                    name: 'Wireless Bluetooth Headphones',
                    price: 89.99,
                    description: 'High-quality wireless headphones with noise cancellation',
                    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
                    category: 'Electronics'
                },
                {
                    _id: '2',
                    name: 'Smart Fitness Watch',
                    price: 199.99,
                    description: 'Advanced fitness tracker with heart rate monitoring',
                    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
                    category: 'Electronics'
                },
                {
                    _id: '3',
                    name: 'Portable Bluetooth Speaker',
                    price: 59.99,
                    description: 'Waterproof portable speaker with 360-degree sound',
                    image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
                    category: 'Electronics'
                }
            ]
        }
    }).as('getProducts')

    cy.intercept('GET', 'http://localhost:5001/api/v1/products/stats', {
        statusCode: 200,
        body: {
            success: true,
            data: {
                overall: {
                    total_products: 3,
                    average_price: 116.66,
                    min_price: 59.99,
                    max_price: 199.99,
                    total_value: 349.97
                },
                byCategory: [
                    {
                        _id: 'Electronics',
                        count: 3,
                        average_price: 116.66
                    }
                ]
            }
        }
    }).as('getProductStats')
})

// Global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
})

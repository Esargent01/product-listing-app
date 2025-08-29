describe('API Integration Tests', () => {
    const apiBaseUrl = 'http://localhost:5001/api/v1'

    describe('Products API', () => {
        it('should fetch products successfully', () => {
            cy.request({
                method: 'GET',
                url: `${apiBaseUrl}/products`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.oneOf([200, 304])
                if (response.status === 200) {
                    expect(response.body).to.have.property('success', true)
                    expect(response.body).to.have.property('products').that.is.an('array')
                    expect(response.body.products).to.have.length.greaterThan(0)
                }
            })
        })

        it('should fetch product statistics', () => {
            cy.request({
                method: 'GET',
                url: `${apiBaseUrl}/products/stats`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.oneOf([200, 304])
                if (response.status === 200) {
                    expect(response.body).to.have.property('success', true)
                    expect(response.body).to.have.property('stats')
                    expect(response.body.stats).to.have.property('total_products')
                    expect(response.body.stats).to.have.property('average_price')
                }
            })
        })

        it('should handle search query parameter', () => {
            cy.request({
                method: 'GET',
                url: `${apiBaseUrl}/products?search=headphones`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.oneOf([200, 304])
                if (response.status === 200) {
                    expect(response.body).to.have.property('success', true)
                    expect(response.body).to.have.property('products').that.is.an('array')
                }
            })
        })

        it('should handle sort query parameter', () => {
            cy.request({
                method: 'GET',
                url: `${apiBaseUrl}/products?sort=price:asc`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.oneOf([200, 304])
                if (response.status === 200) {
                    expect(response.body).to.have.property('success', true)
                    expect(response.body).to.have.property('products').that.is.an('array')
                }
            })
        })
    })

    describe('Health Check', () => {
        it('should return health status', () => {
            cy.request({
                method: 'GET',
                url: 'http://localhost:5001/health',
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.oneOf([200, 304])
                if (response.status === 200) {
                    expect(response.body).to.have.property('success', true)
                    expect(response.body).to.have.property('message', 'Server is running')
                }
            })
        })
    })

    describe('Error Handling', () => {
        it('should handle 404 for non-existent routes', () => {
            cy.request({
                method: 'GET',
                url: `${apiBaseUrl}/nonexistent`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.equal(404)
            })
        })

        it('should handle invalid product ID', () => {
            cy.request({
                method: 'GET',
                url: `${apiBaseUrl}/products/invalid-id`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.equal(404)
                expect(response.body).to.have.property('success', false)
            })
        })
    })

    describe('CORS Headers', () => {
        it('should include CORS headers', () => {
            cy.request({
                method: 'GET',
                url: `${apiBaseUrl}/products`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.headers).to.have.property('access-control-allow-origin')
            })
        })
    })
})

const testServer = require('../utils/testServer');
const { testProducts } = require('../utils/testData');
const { saveAllProducts, setTestMode } = require('../../utils/storage');

describe('Product Controller', () => {
    beforeEach(async () => {
        setTestMode(true);
        await saveAllProducts(testProducts);
    });

    afterEach(() => {
        setTestMode(false);
    });

    describe('GET /api/v1/products', () => {
        it('should return all products', async () => {
            const response = await testServer
                .get('/api/v1/products')
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.products).toHaveLength(2);
            expect(response.body.count).toBe(2);
        });

        it('should filter products by search term', async () => {
            const response = await testServer
                .get('/api/v1/products?search=Product 1')
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.products).toHaveLength(1);
            expect(response.body.products[0].name).toBe('Test Product 1');
        });

        it('should sort products by price ascending', async () => {
            const response = await testServer
                .get('/api/v1/products?sort=price:asc')
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.products[0].price).toBe(99.99);
            expect(response.body.products[1].price).toBe(149.99);
        });

        it('should sort products by price descending', async () => {
            const response = await testServer
                .get('/api/v1/products?sort=price:desc')
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.products[0].price).toBe(149.99);
            expect(response.body.products[1].price).toBe(99.99);
        });
    });

    describe('GET /api/v1/products/stats', () => {
        it('should return product statistics', async () => {
            const response = await testServer
                .get('/api/v1/products/stats')
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.stats.total_products).toBe(2);
            expect(response.body.stats.average_price).toBeCloseTo(124.99, 2);
            expect(response.body.stats.min_price).toBe(99.99);
            expect(response.body.stats.max_price).toBe(149.99);
            expect(response.body.stats.total_value).toBeCloseTo(249.98, 2);
        });
    });
});

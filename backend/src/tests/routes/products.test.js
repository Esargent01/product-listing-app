const testServer = require('../utils/testServer');

describe('Product Routes', () => {
    describe('GET /api/v1/products', () => {
        it('should return 200 for valid request', async () => {
            await testServer
                .get('/api/v1/products')
                .expect(200);
        });
    });

    describe('GET /api/v1/products/stats', () => {
        it('should return 200 for valid request', async () => {
            await testServer
                .get('/api/v1/products/stats')
                .expect(200);
        });
    });

    describe('GET /api/v1/nonexistent', () => {
        it('should return 404 for non-existent route', async () => {
            await testServer
                .get('/api/v1/nonexistent')
                .expect(404);
        });
    });
});

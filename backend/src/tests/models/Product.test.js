const InMemoryProduct = require('../../models/Product');
const { testProducts } = require('../utils/testData');
const { saveAllProducts, setTestMode } = require('../../utils/storage');

describe('InMemoryProduct', () => {
    beforeEach(async () => {
        setTestMode(true);
        await saveAllProducts(testProducts);
    });

    afterEach(() => {
        setTestMode(false);
    });

    describe('findAll', () => {
        it('should return all products', async () => {
            const products = await InMemoryProduct.findAll();
            expect(products).toHaveLength(2);
            expect(products[0].name).toBe('Test Product 1');
            expect(products[1].name).toBe('Test Product 2');
        });
    });

    describe('countDocuments', () => {
        it('should return the correct count', async () => {
            const count = await InMemoryProduct.countDocuments();
            expect(count).toBe(2);
        });
    });

    describe('aggregate', () => {
        it('should filter products by name', async () => {
            const pipeline = [
                { $match: { name: { $regex: 'Product 1' } } }
            ];
            const products = await InMemoryProduct.aggregate(pipeline);
            expect(products).toHaveLength(1);
            expect(products[0].name).toBe('Test Product 1');
        });

        it('should filter products by description', async () => {
            const pipeline = [
                { $match: { description: { $regex: 'description 2' } } }
            ];
            const products = await InMemoryProduct.aggregate(pipeline);
            expect(products).toHaveLength(1);
            expect(products[0].name).toBe('Test Product 2');
        });

        it('should return all products for empty pipeline', async () => {
            const products = await InMemoryProduct.aggregate([]);
            expect(products).toHaveLength(2);
        });
    });
});

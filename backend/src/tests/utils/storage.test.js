const { getAllProducts, saveAllProducts, setTestMode } = require('../../utils/storage');
const { testProducts } = require('./testData');

describe('Storage Utils', () => {
    beforeEach(() => {
        setTestMode(true);
    });

    afterEach(() => {
        setTestMode(false);
    });

    describe('getAllProducts', () => {
        it('should return empty array when no products', async () => {
            await saveAllProducts([]);
            const products = await getAllProducts();
            expect(products).toEqual([]);
        });

        it('should return saved products', async () => {
            await saveAllProducts(testProducts);
            const products = await getAllProducts();
            expect(products).toEqual(testProducts);
        });
    });

    describe('saveAllProducts', () => {
        it('should save products in test mode', async () => {
            await saveAllProducts(testProducts);
            const products = await getAllProducts();
            expect(products).toEqual(testProducts);
        });

        it('should overwrite existing products', async () => {
            await saveAllProducts(testProducts);
            const newProducts = [{ _id: 'new', name: 'New Product', price: 100 }];
            await saveAllProducts(newProducts);
            const products = await getAllProducts();
            expect(products).toEqual(newProducts);
        });
    });

    describe('setTestMode', () => {
        it('should enable test mode', async () => {
            setTestMode(true);
            await saveAllProducts(testProducts);
            const products = await getAllProducts();
            expect(products).toEqual(testProducts);
        });

        it('should disable test mode', async () => {
            setTestMode(false);
            // This should read from the actual file, not in-memory data
            const products = await getAllProducts();
            // Should return actual file data or empty array if file doesn't exist
            expect(Array.isArray(products)).toBe(true);
        });
    });
});


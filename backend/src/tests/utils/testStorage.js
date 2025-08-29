const fs = require('fs').promises;
const path = require('path');

const TEST_STORAGE_FILE = path.join(__dirname, '../../../data/test-products.json');

const ensureTestDataDir = async () => {
    const dataDir = path.dirname(TEST_STORAGE_FILE);
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
};

const readTestProducts = async () => {
    try {
        await ensureTestDataDir();
        const data = await fs.readFile(TEST_STORAGE_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeTestProducts = async (products) => {
    await ensureTestDataDir();
    await fs.writeFile(TEST_STORAGE_FILE, JSON.stringify(products, null, 2));
};

const getTestProducts = async () => {
    return await readTestProducts();
};

const saveTestProducts = async (products) => {
    await writeTestProducts(products);
};

const cleanupTestData = async () => {
    try {
        await fs.unlink(TEST_STORAGE_FILE);
    } catch (error) {
        // File doesn't exist, which is fine
    }
};

module.exports = {
    getTestProducts,
    saveTestProducts,
    cleanupTestData
};

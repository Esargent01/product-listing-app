const fs = require('fs').promises;
const path = require('path');

const STORAGE_FILE = path.join(__dirname, '../../data/products.json');

// In-memory storage for test mode
let inMemoryData = [];
let isTestMode = false;

const setTestMode = (enabled) => {
    isTestMode = enabled;
    if (enabled) {
        inMemoryData = [];
    }
};

const ensureDataDir = async () => {
    const dataDir = path.dirname(STORAGE_FILE);
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
};

const readProducts = async () => {
    if (isTestMode) {
        return inMemoryData;
    }

    try {
        await ensureDataDir();
        const data = await fs.readFile(STORAGE_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeProducts = async (products) => {
    if (isTestMode) {
        inMemoryData = [...products];
        return;
    }

    await ensureDataDir();
    await fs.writeFile(STORAGE_FILE, JSON.stringify(products, null, 2));
};

const getAllProducts = async () => {
    return await readProducts();
};

const saveAllProducts = async (products) => {
    await writeProducts(products);
};

module.exports = {
    getAllProducts,
    saveAllProducts,
    setTestMode
};

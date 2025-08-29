const { testProducts } = require('./testData');

// In-memory storage for tests
let testData = [...testProducts];

const mockGetAllProducts = async () => {
    return testData;
};

const mockSaveAllProducts = async (products) => {
    testData = [...products];
};

const resetTestData = () => {
    testData = [...testProducts];
};

const setTestData = (products) => {
    testData = [...products];
};

module.exports = {
    mockGetAllProducts,
    mockSaveAllProducts,
    resetTestData,
    setTestData
};

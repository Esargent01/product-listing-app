const { getDatabase } = require('../config/database');
const { getAllProducts, saveAllProducts } = require('../utils/storage');

class InMemoryProduct {
    static async findAll() {
        const db = getDatabase();
        if (db) {
            try {
                const collection = db.collection('products');
                return await collection.find({}).toArray();
            } catch (error) {
                console.log('Using in-memory storage (MongoDB not connected)');
                return await getAllProducts();
            }
        } else {
            console.log('Using in-memory storage (MongoDB not connected)');
            return await getAllProducts();
        }
    }

    static async countDocuments() {
        const products = await this.findAll();
        return products.length;
    }

    static async aggregate(pipeline) {
        const products = await this.findAll();

        if (pipeline.length === 0) return products;

        const matchStage = pipeline.find(stage => stage.$match);
        if (matchStage) {
            const { name, description } = matchStage.$match;
            if (name || description) {
                const searchTerm = (name || description).$regex;
                const regex = new RegExp(searchTerm, 'i');
                return products.filter(product =>
                    regex.test(product.name) || regex.test(product.description)
                );
            }
        }

        return products;
    }
}

module.exports = InMemoryProduct;

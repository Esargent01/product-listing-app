const Product = require('../models/Product');

const getProducts = async (req, res) => {
    try {
        const { search, sort } = req.query;
        let products = await Product.findAll();

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            products = products.filter(product =>
                searchRegex.test(product.name) || searchRegex.test(product.description)
            );
        }

        if (sort) {
            const [field, order] = sort.split(':');
            if (field === 'price') {
                products.sort((a, b) => {
                    if (order === 'asc') {
                        return a.price - b.price;
                    } else {
                        return b.price - a.price;
                    }
                });
            }
        }

        res.status(200).json({
            success: true,
            count: products.length,
            products: products
        });
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const getProductStats = async (req, res) => {
    try {
        const products = await Product.findAll();

        if (products.length === 0) {
            return res.status(200).json({
                success: true,
                stats: {
                    total_products: 0,
                    average_price: 0,
                    min_price: 0,
                    max_price: 0,
                    total_value: 0
                }
            });
        }

        const stats = products.reduce((acc, product) => {
            acc.total_products += 1;
            acc.total_value += product.price;
            acc.min_price = Math.min(acc.min_price, product.price);
            acc.max_price = Math.max(acc.max_price, product.price);
            return acc;
        }, {
            total_products: 0,
            total_value: 0,
            min_price: products[0].price,
            max_price: products[0].price
        });

        stats.average_price = stats.total_value / stats.total_products;

        res.status(200).json({
            success: true,
            stats: stats
        });
    } catch (error) {
        console.error('Error getting product stats:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    getProducts,
    getProductStats
};

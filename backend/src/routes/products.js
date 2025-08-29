const express = require('express');
const router = express.Router();
const { getProducts, getProductStats } = require('../controllers/productController');

router.route('/')
    .get(getProducts);

router.route('/stats')
    .get(getProductStats);

module.exports = router;

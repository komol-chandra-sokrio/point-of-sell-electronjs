var express = require('express');
var router = express.Router();
const productController = require('../products/products.controller');
const customerController = require('../customers/customers.controller');
const orderController = require('../orders/orders.controller');

/* GET home page. */
router.get('/', function (req, res) {
	res.send('Welcome to Point Of Sell service api');
});

//product routes
router.post('/products', productController.createData);
router.get('/products', productController.getList);
router.get('/products/:id', productController.getById);
router.put('/products/:id', productController.updateById);
router.delete('/products/:id', productController.deleteById);

//product routes
router.post('/customers', customerController.store);
router.get('/customers', customerController.index);
router.get('/customers/:id', customerController.find);
router.put('/customers/:id', customerController.update);
router.delete('/customers/:id', customerController.destroy);

//order routes
router.post('/orders', orderController.store);
router.get('/orders', orderController.index);
router.get('/orders/:id', orderController.find);
router.put('/orders/:id', orderController.update);
router.delete('/orders/:id', orderController.destroy);

module.exports = router;

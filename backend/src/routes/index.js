var express = require('express');
var router = express.Router();
const foodController = require('../foods/foods.controller');
const productController = require('../products/products.controller');
const studentController = require('../students/students.controller');
const customerController = require('../customers/customers.controller');

/* GET home page. */
router.get('/', function (req, res) {
	res.send('Welcome to Yoda Hostel service api');
});

//food routes
router.post('/foods', foodController.createFood);
router.get('/foods', foodController.getFood);
router.get('/foods/:id', foodController.getFoodById);
router.put('/foods/:id', foodController.updateFoodById);
router.delete('/foods/:id', foodController.deleteFoodById);

//student routes
router.post('/students', studentController.createStudent);
router.get('/students', studentController.getStudent);
router.get('/students/:id', studentController.getStudentById);
router.put('/students/:id', studentController.updateStudentById);
router.delete('/students/:id', studentController.deleteStudentById);

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

module.exports = router;

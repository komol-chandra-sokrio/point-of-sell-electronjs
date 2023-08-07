const Customer = require('./customers.model');
const Product = require('../products/products.model');
const Order = require('../orders/orders.model');

module.exports.createRecord = async function (data) {
	return Customer.create(data);
};

module.exports.getList = async function (PAGE_SIZE, PAGE_NUMBER) {
	const total = await Customer.countDocuments({});
	const customers = await Customer.find({})
		.limit(PAGE_SIZE)
		.skip(PAGE_SIZE * PAGE_NUMBER);
	return {
		total: Math.ceil(total / PAGE_SIZE),
		list: customers
	};
};

module.exports.getReportData = async function () {
	const products = await Product.countDocuments({});
	const orders = await Order.countDocuments({});
	const customers = await Customer.countDocuments({});
	return {
		products: products,
		customers: customers,
		orders: orders
	};
};

module.exports.getCustomerList = async function () {
	const customers = await Customer.find({});
	return {
		customers: customers
	};
};

module.exports.getById = async function (studentId) {
	return Customer.findById(studentId);
};

module.exports.updateById = async function (id, updateData) {
	return Customer.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports.deleteById = async function (id) {
	return Customer.findByIdAndDelete(id);
};

const Order = require('./orders.model');
const Customer = require('../customers/customers.model');

const generateInvoiceId = () => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	const charactersLength = characters.length;
	for (let i = 0; i < 12; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

module.exports.createRecord = async function (data) {
	try {
		const { customerId, customerInfo, grandTotal, note, products } = data;

		// First, check if the customer with the given customerId exists
		const customer = await Customer.findById(customerId);
		if (!customer) {
			return { error: 'Customer not found' };
		}

		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let result = '';
		const charactersLength = characters.length;
		for (let i = 0; i < 8; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		// Create a new Order instance
		const order = new Order({
			customer: customerId,
			date: new Date(),
			customerInfo,
			grandTotal,
			invoiceId: result,
			note,
			products
		});
		return order.save();
	} catch (error) {
		console.log(error);
		console.error('Error saving order:', error);
		return { error: 'Internal server error' };
	}
};

module.exports.getList = async function (PAGE_SIZE, PAGE_NUMBER, searchQuery) {
	const query = {};

	if (searchQuery) {
		PAGE_NUMBER = 0;
		query.invoiceId = { $regex: new RegExp(searchQuery, 'i') };
	}

	try {
		let total;
		let list;
		if (searchQuery) {
			total = await Order.countDocuments(query);
			list = await Order.find(query);
			if (total === 1) {
				return {
					total: 1,
					list: list
				};
			} else {
				list = await Order.find(query)
					.limit(PAGE_SIZE)
					.skip(PAGE_SIZE * PAGE_NUMBER);
				total = await Order.countDocuments(query);
			}
		} else {
			total = await Order.countDocuments();
			list = await Order.find({})
				.limit(PAGE_SIZE)
				.skip(PAGE_SIZE * PAGE_NUMBER);
		}

		return {
			total: Math.ceil(total / PAGE_SIZE),
			list: list
		};
	} catch (error) {
		console.error('Error fetching product data:', error);
		return {
			total: 0,
			list: []
		};
	}
};

module.exports.getById = async function (id) {
	return Order.findById(id).populate('customer');
};

module.exports.updateById = async function (id, updateData) {
	return Order.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports.deleteById = async function (id) {
	return Order.findByIdAndDelete(id);
};

const Order = require('./orders.model');

module.exports.createRecord = async function (data) {
	return Order.create(data);
};

module.exports.getList = async function (PAGE_SIZE, PAGE_NUMBER) {
	const total = await Order.countDocuments({});
	const orders = await Order.find({})
		.limit(PAGE_SIZE)
		.skip(PAGE_SIZE * PAGE_NUMBER);
	return {
		total: Math.ceil(total / PAGE_SIZE),
		list: orders
	};
};
module.exports.getById = async function (studentId) {
	return Order.findById(studentId);
};

module.exports.updateById = async function (id, updateData) {
	return Order.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports.deleteById = async function (id) {
	return Order.findByIdAndDelete(id);
};

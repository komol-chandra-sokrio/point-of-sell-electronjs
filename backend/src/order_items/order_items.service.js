const OrderItem = require('./order_items.model');

module.exports.createRecord = async function (data) {
	return OrderItem.create(data);
};

module.exports.getList = async function (PAGE_SIZE, PAGE_NUMBER) {
	const total = await OrderItem.countDocuments({});
	const items = await OrderItem.find({})
		.limit(PAGE_SIZE)
		.skip(PAGE_SIZE * PAGE_NUMBER);
	return {
		total: Math.ceil(total / PAGE_SIZE),
		list: items
	};
};
module.exports.getById = async function (studentId) {
	return OrderItem.findById(studentId);
};

module.exports.updateById = async function (id, updateData) {
	return OrderItem.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports.deleteById = async function (id) {
	return OrderItem.findByIdAndDelete(id);
};

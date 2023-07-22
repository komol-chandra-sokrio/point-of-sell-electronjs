const Customer = require('./customers.model');

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
module.exports.getById = async function (studentId) {
	return Customer.findById(studentId);
};

module.exports.updateById = async function (id, updateData) {
	return Customer.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports.deleteById = async function (id) {
	return Customer.findByIdAndDelete(id);
};

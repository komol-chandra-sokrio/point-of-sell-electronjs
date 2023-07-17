const Product = require('./products.model');

module.exports.createData = async function (data) {
	return Product.create(data);
};

module.exports.getList = async function (PAGE_SIZE, PAGE_NUMBER) {
	const total = await Product.countDocuments({});
	const list = await Product.find({})
		.limit(PAGE_SIZE)
		.skip(PAGE_SIZE * PAGE_NUMBER);
	return {
		total: Math.ceil(total / PAGE_SIZE),
		list: list
	};
};

module.exports.getById = async function (id) {
	return Product.findById(id);
};

module.exports.updateById = async function (id, update) {
	return Product.findByIdAndUpdate(id, update, { new: true });
};

module.exports.deleteById = async function (id) {
	return Product.findByIdAndDelete(id);
};

const Product = require('./products.model');

module.exports.createData = async function (data) {
	return Product.create(data);
};

// module.exports.getList = async function (PAGE_SIZE, PAGE_NUMBER) {
// 	const total = await Product.countDocuments({});
// 	const list = await Product.find({})
// 		.limit(PAGE_SIZE)
// 		.skip(PAGE_SIZE * PAGE_NUMBER);
// 	return {
// 		total: Math.ceil(total / PAGE_SIZE),
// 		list: list
// 	};
// };

module.exports.getList = async function (PAGE_SIZE, PAGE_NUMBER, searchQuery) {
	const query = {};

	if (searchQuery) {
		PAGE_NUMBER = 0;
		query.name = { $regex: new RegExp(searchQuery, 'i') };
	}

	try {
		let total;
		let list;
		if (searchQuery) {
			total = await Product.countDocuments(query);
			list = await Product.find(query);
			if (total === 1) {
				return {
					total: 1,
					list: list
				};
			} else {
				list = await Product.find(query)
					.limit(PAGE_SIZE)
					.skip(PAGE_SIZE * PAGE_NUMBER);
				total = await Product.countDocuments(query);
			}
		} else {
			total = await Product.countDocuments();
			list = await Product.find({})
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

module.exports.getProductList = async function () {
	const product_list = await Product.find({});
	return {
		products: product_list
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

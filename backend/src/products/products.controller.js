const dataService = require('./products.service');

module.exports.createData = async function (req, res) {
	const body = req.body;
	const data = await dataService.createData(body);
	return res.status(200).json(data);
};

module.exports.getList = async function (req, res) {
	const PAGE_SIZE = 5;
	const PAGE_NUMBER = parseInt(req.query.page || '0');
	const searchQuery = req.query.name || '';
	const list = await dataService.getList(PAGE_SIZE, PAGE_NUMBER, searchQuery);
	return res.json(list);
};

module.exports.getProductList = async function (req, res) {
	const list = await dataService.getProductList();
	return res.json(list);
};

module.exports.getById = async function (req, res) {
	const id = req.params.id;
	const data = await dataService.getById(id);
	return res.json(data);
};

module.exports.updateById = async function (req, res) {
	const id = req.params.id;
	const update = req.body;
	const data = await dataService.updateById(id, update);
	return res.json(data);
};

module.exports.deleteById = async function (req, res) {
	const id = req.params.id;
	const data = await dataService.deleteById(id);
	return res.json(data);
};

const dataService = require('./orders.service');

module.exports.store = async function (req, res) {
	const data = req.body;
	const create = await dataService.createRecord(data);
	return res.json(create);
};

module.exports.index = async function (req, res) {
	const PAGE_SIZE = 10;
	const PAGE_NUMBER = parseInt(req.query.page || '0');
	const searchQuery = req.query.name || '';
	const list = await dataService.getList(PAGE_SIZE, PAGE_NUMBER, searchQuery);
	return res.json(list);
};

module.exports.find = async function (req, res) {
	const id = req.params.id;
	const data = await dataService.getById(id);
	return res.json(data);
};

module.exports.update = async function (req, res) {
	const id = req.params.id;
	const update = req.body;
	const data = await dataService.updateById(id, update);
	return res.json(data);
};

module.exports.destroy = async function (req, res) {
	const id = req.params.id;
	const data = await dataService.deleteById(id);
	return res.json(data);
};

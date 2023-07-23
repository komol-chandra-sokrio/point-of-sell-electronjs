const mongoose = require('mongoose');
const { Schema } = mongoose;
const orderSchema = new Schema(
	{
		id: {
			type: String,
			required: true
		},
		date: {
			type: String,
			required: true
		},
		invoice_id: {
			type: String,
			required: true
		},
		customer_id: {
			type: String,
			required: true
		},
		grand_total: {
			type: String,
			required: true
		},
		note: {
			type: String,
			required: false
		},
		status: {
			type: String,
			required: false
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

module.exports = mongoose.model('Order', orderSchema);

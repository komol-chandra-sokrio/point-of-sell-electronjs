const mongoose = require('mongoose');
const { Schema } = mongoose;
const orderItemSchema = new Schema(
	{
		id: {
			type: String,
			required: true
		},
		order_id: {
			type: String,
			required: true
		},
		product_id: {
			type: String,
			required: true
		},
		price: {
			type: String,
			required: true
		},
		qty: {
			type: String,
			required: true
		},
		sub_total: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

module.exports = mongoose.model('OrderItem', orderItemSchema);

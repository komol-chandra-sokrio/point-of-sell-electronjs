const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
	{
		id: {
			type: String,
			required: true,
			unique: true
		},
		name: {
			type: String,
			required: true
		},

		purchase_price: {
			type: Number,
			required: true
		},
		price: {
			type: Number,
			required: true
		},
		sku: {
			type: String,
			required: true
		},

		description: {
			type: String,
			required: false
		},
		category_id: {
			type: String,
			required: false
		},
		brand_id: {
			type: String,
			required: false
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

module.exports = mongoose.model('Product', productSchema);

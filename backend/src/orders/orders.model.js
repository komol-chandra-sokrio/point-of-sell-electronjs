const mongoose = require('mongoose');
const { Schema } = mongoose;
const orderSchema = new Schema(
	{
		customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
		customerInfo: { type: Object, required: true },
		date: { type: Date, required: true },
		grandTotal: { type: Number, required: true },
		invoiceId: { type: String, required: true },
		note: { type: String },
		products: [
			{
				createdAt: { type: Date, required: true },
				description: { type: String, required: true },
				name: { type: String, required: true },
				price: { type: Number, required: true },
				purchase_price: { type: Number, required: true },
				quantity: { type: Number, required: true },
				sku: { type: String, required: true },
				updatedAt: { type: Date, required: true },
				_id: { type: String, required: true }
			}
		]
	},
	{
		timestamps: true,
		versionKey: false
	}
);

module.exports = mongoose.model('Order', orderSchema);

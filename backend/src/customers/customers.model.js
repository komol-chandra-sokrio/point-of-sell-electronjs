const mongoose = require('mongoose');
const { Schema } = mongoose;
const customerSchema = new Schema(
	{
		id: {
			type: String,
			required: true
		},
		full_name: {
			type: String,
			required: true
		},
		phone: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: false
		},
		address: {
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

module.exports = mongoose.model('Customer', customerSchema);

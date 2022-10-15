const mongoose = require("mongoose");
const Product = mongoose.model("Product", {
	name: {
		type: String,
		required: true,
		minlength: 1,
	},
	price: {
		type: Number,
		required: true,
		minlength: 1,
	},
	description: {
		type: String,
		required: true,
		minlength: 1,
	},
	image: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
	},
	category: {
		type: String,
		required: true,
		minlength: 1,
	},
});
module.exports = Product;
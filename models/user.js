const mongoose = require("mongoose");

const User = mongoose.model("User", {
	name: {
		type: String,
		required: true,
		minlength: [4, "Name must be at least 4 characters long"],
	},
	email: {
		type: String,
		required: true,
		minlength: [4, "Email must be at least 4 characters long"],
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: [4, "Password must be at least 4 characters long"],
	},
	roles: {
		type: Array,
		required: true,
		default:["client"]
	}
});
module.exports = User;
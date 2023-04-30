const { Schema, model } = require("mongoose");

const UserAuth = model(
  "UserAuth",
  new Schema({
    FirstName: {
      type: String,
      required: true,
      minlength: [2, "First Name must be at least 4 characters long"],
    },
    LastName: {
      type: String,
      required: true,
      minlength: [2, "Last Name must be at least 4 characters long"],
    },
    Email: {
      type: String,
      required: true,
      minlength: [4, "Email must be at least 4 characters long"],
      trim: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
      minlength: [4, "Password must be at least 4 characters long"],
    },
  })
);
module.exports = UserAuth;

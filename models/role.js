const mongoose = require("mongoose");

const Role = mongoose.model("Role", {
  Name: {
    type: String
  }
});
module.exports = Role;
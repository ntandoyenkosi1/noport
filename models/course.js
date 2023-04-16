const mongoose = require("mongoose");

const Course = mongoose.model("Course", {
  Name: {
    type: String,
    required: true,
    minlength: [2, "Name must be at least 2 characters long"],
  },
  StartDate: {
    type: Date,
    required: true,
  },
  EndDate: {
    type: String,
  },
  Status: {
    type: String,
  },
});
module.exports = Course;

const mongoose = require("mongoose");
const User = require("../models/user.model");

const studentSchema = new mongoose.Schema({
  cpf: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["Student"],
  },

  connections: [
    {
      type: Array,
      default: [],
    },
  ],

  schoolsFollowing: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
  ],

  companiesFollowing: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  ],

  savedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});

const Student = User.discriminator("Student", studentSchema);

module.exports = Student;

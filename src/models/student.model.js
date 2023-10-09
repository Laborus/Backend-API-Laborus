const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String, // Armazena a localização da API como "Cidade - UF" (ex.: "São Paulo - SP")
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: "",
  },
  bannerImage: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["Student"],
    required: true,
  },
  connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
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
  description: {
    type: String,
    required: true,
  },
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
  verifed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Student", studentSchema);

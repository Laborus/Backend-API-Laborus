const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cnpj: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String, // Armazena a localização da API como "Cidade - UF" (ex.: "São Paulo - SP").
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
  description: {
    type: String,
    required: true,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "followerType",
    },
  ],
  followerType: {
    type: String,
    enum: ["Student", "Company", "School"],
  },
});

module.exports = mongoose.model("School", schoolSchema);

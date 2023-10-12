const mongoose = require("mongoose");
const User = require("../models/user.model");

const companySchema = new mongoose.Schema({
  cnpj: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["Company"],
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

const Company = User.discriminator("Company", companySchema);

module.exports = Company;

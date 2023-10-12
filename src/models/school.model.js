const mongoose = require("mongoose");
const User = require("../models/user.model");

const schoolSchema = new mongoose.Schema({
  cnpj: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["School"],
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

const School = User.discriminator("School", schoolSchema);

module.exports = School;

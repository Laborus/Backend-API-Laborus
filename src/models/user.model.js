const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 25,
  },

  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    min: 8,
  },

  location: {
    type: String,
    required: true,
  },

  profileImage: {
    type: String,
    default: "./public/profileImage_default.png",
  },

  bannerImage: {
    type: String,
    default: "./public/bannerImage_default.png",
  },

  description: {
    type: String,
  },

  role: {
    type: String,
    enum: ["Student", "Company", "School"],
    required: true,
  },

  tags: {
    type: [String],
    validate: {
      validator: function (tags) {
        return tags.length <= 3;
      },
      message: "A maximum of 3 tags is allowed.",
    },
  },

  verifed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);

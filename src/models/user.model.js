const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
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

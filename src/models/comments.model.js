const mongoose = require("mongoose");
const User = require("./user");

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: String,
  likesCount: {
    type: Number,
    default: 0,
  },
  responses: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: String,
      likesCount: {
        type: Number,
        default: 0,
      },
      responses: [],
      createdAt: {
        type: Date,
        default: Date.now, // Sets the creation date and time to the current moment by default
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  isDisabled: {
    type: Boolean,
    default: false, // Comments active by default
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

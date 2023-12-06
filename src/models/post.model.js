const mongoose = require("mongoose");
const User = require("../models/user.model");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: String,
  media: {
    type: String, // URL da imagem ou vídeo
  },
  visibility: {
    type: String,
    enum: ["public", "private"], // Public ou private
    default: "public", // Defina o padrão como "public"
  },
  likesCount: {
    type: Number,
    default: 0, // Inicializa com zero curtidas
  },
  route: {
    type: String,
    enum: ["global", "campus", "event"],
    required: true,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Referência ao modelo de usuário
      },
      text: String, // Texto do comentário
      visibility: {
        type: String,
        enum: ["public", "private"],
        default: "public",
      },
    },
  ],
  reportCount: {
    type: Number,
    default: 0, // Contador de denúncias
  },
  shares: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referência ao modelo de usuário que compartilhou
    },
  ],
  savedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referência ao modelo de usuário que salvou
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);

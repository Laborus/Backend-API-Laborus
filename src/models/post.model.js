const mongoose = require("mongoose");
const User = require("./user");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: String,
  media: {
    type: String, // URL da imagem ou vídeo
  },
  code: {
    type: String, // Código formatado com sintaxeHighlight (opcional)
    default: "", // Pode ser vazio por padrão
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
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Referência ao modelo de usuário
      },
      text: String, // Texto do comentário
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

const School = require("../models/school.model");
const Post = require("../models/post.model");
const Student = require("../models/student.model");

// Cria um novo post
exports.createPost = async (req, res) => {
  const { text, visibility, route } = req.body;

  try {
    // Obtenha o ID do usuário a partir do token JWT ou de outra forma que você estiver usando
    const userId = req.user.id; // Isso pressupõe que você tem o ID do usuário no objeto de solicitação (req.user)

    // Verifica se o post está vazio
    if (!text && !req.file) {
      return res.status(400).json({
        error: "Post cannot be empty. Please provide text or an image.",
      });
    }

    // Verifica se a visibilidade é válida
    if (visibility !== "public" && visibility !== "private") {
      return res.status(400).json({
        error: "Invalid visibility type. Allowed types: public, private",
      });
    }

    if (
      (visibility === "public" && req.body.private) ||
      (visibility === "private" && req.body.public)
    ) {
      return res.status(400).json({
        error:
          "Invalid visibility type. Choose either 'public' or 'private', not both",
      });
    }

    // Adicione suas validações de imagem aqui
    if (req.file) {
      const allowedFileTypes = ["image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5 MB

      if (!allowedFileTypes.includes(req.file.mimetype)) {
        return res
          .status(400)
          .json({ error: "Invalid file type. Allowed types: JPEG, PNG" });
      }

      if (req.file.size > maxSize) {
        return res
          .status(400)
          .json({ error: "File size exceeds the maximum limit (5 MB)" });
      }
    }

    // Verifica se o usuário é do tipo Student e adiciona a escola ao post
    let schoolId;

    if (req.user.role === "Student" && req.body.school) {
      // Aqui você deve adicionar a lógica para obter o ID da escola com base no nome ou em qualquer outra informação que você tenha
      const school = await School.findOne({ name: req.body.school });

      if (!school) {
        return res.status(404).json({ error: "School not found." });
      }

      schoolId = school._id;
    }

    const newPost = new Post({
      user: userId, // Adicionando o ID do usuário que criou o post
      text,
      media: req.file ? req.file.path : undefined, // Salva o caminho do arquivo no banco de dados, se existir
      visibility,
      school: schoolId,
      route,
    });

    if (!["global", "campus", "event"].includes(route)) {
      return res.status(400).json({
        error: "Invalid route type. Allowed types: global, campus, event",
      });
    }

    const savedPost = await newPost.save();

    res.json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// All posts

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get by id

exports.getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    // Consulta o post pelo ID no banco de dados
    const post = await Post.findById(postId);

    // Verifica se o post foi encontrado
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Edit post

exports.editPost = async (req, res) => {
  try {
    const postId = req.params.id; // ID do post a ser editado

    // Encontre o post no banco de dados pelo ID
    const post = await Post.findById(postId);

    // Verifique se o post existe
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Verifica se o usuário que está solicitando a edição é o mesmo que criou o post
    if (!post.user || post.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Unauthorized. You are not the author of this post." });
    }

    // Atualize as informações do post com base nos campos recebidos na solicitação
    post.text = req.body.text || post.text;
    post.visibility = req.body.visibility || post.visibility;
    post.route = req.body.route || post.route;

    // Salve as alterações no banco de dados
    await post.save();

    res.json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    // Verifica se o post existe no banco de dados
    const post = await Post.findById(postId);

    // Se o post não existir, retorna um erro
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    // Verifica se o usuário que está solicitando a exclusão é o mesmo que criou o post
    if (!post.user || post.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Unauthorized. You are not the author of this post." });
    }

    // Remove o post do banco de dados
    await post.remove();

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

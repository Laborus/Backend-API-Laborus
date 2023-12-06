const School = require("../models/school.model");
const Post = require("../models/post.model");
const Student = require("../models/student.model");

exports.createPost = async (req, res) => {
  try {
    const userId = req.user.id;

    // Verifica se o usuário é do tipo Student ou School
    const student = await Student.findOne({ user: userId });
    const school = await School.findOne({ user: userId });

    if (!student && !school) {
      return res.status(403).json({
        message:
          "Permission denied. Only students and schools can create posts.",
      });
    }

    const schoolId = req.params.schoolId;

    // Verifica se a escola existe
    const schoolExists = await School.findById(schoolId);

    if (!schoolExists) {
      return res.status(404).json({ message: "School not found." });
    }

    const { text, media, visibility } = req.body;

    // Cria um novo post associado à escola
    const newPost = new Post({
      user: userId,
      text,
      media,
      visibility,
      school: schoolId,
    });

    await newPost.save();

    res.json({ message: "Post created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const User = require("../models/user.model");

exports.editProfile = async (req, res) => {
  try {
    const userId = req.user.id; // ID do usuário a partir do token JWT

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.location = req.body.location || user.location;
    user.description = req.body.description || user.description;
    user.profileImage = req.body.profileImage || user.profileImage;
    user.bannerImage = req.body.bannerImage || user.bannerImage;
    user.tags = req.body.tags || user.tags;

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

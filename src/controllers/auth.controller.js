const Student = require("../models/student.model");
const School = require("../models/school.model");
const Company = require("../models/company.model");
const User = require("../models/user.model");

exports.signup = async (req, res) => {
  const { role } = req.body;

  const commonFields = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    location: req.body.location,
    description: req.body.description,
    profileImage: req.body.profileImage,
    bannerImage: req.body.bannerImage,
    tags: req.body.tags,
  };

  let user;

  if (role === "Student") {
    const studentFields = {
      cpf: req.body.cpf,
      school: req.body.school,
    };
    user = new Student({ ...commonFields, ...studentFields });
  } else if (role === "School") {
    const schoolFields = {
      cnpj: req.body.cnpj,
    };
    user = new School({ ...commonFields, ...schoolFields });
  } else if (role === "Company") {
    const companyFields = {
      cnpj: req.body.cnpj,
    };
    user = new Company({ ...commonFields, ...companyFields });
  } else {
    return res.status(400).json({ message: "Invalid role." });
  }

  try {
    const userExists = await User.findOne({ email: req.body.email });

    // Check if a user exists

    if (userExists)
      return res.status(403).json({
        message: "E-mail already in use!",
      });
    // Create and save the user document
    const savedUser = await User.create(user);
    // Save the specific user type document
    await user.save();

    res.json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// User signIn

// Get allUsers

exports.allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get UserById

exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!user) {
      res.status(422).json({ message: "User not found." });
      return;
    }

    const user = await User.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

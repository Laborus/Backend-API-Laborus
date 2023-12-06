const Student = require("../models/student.model");
const School = require("../models/school.model");
const Company = require("../models/company.model");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { cpf, cnpj } = require("cpf-cnpj-validator");

exports.signup = async (req, res, next) => {
  const { role } = req.body;

  console.log("Entrou em AuthController.signup");

  const commonFields = {
    name: req.body.name,
    email: req.body.email,
    location: req.body.location,
    description: req.body.description,
    profileImage: req.body.profileImage,
    bannerImage: req.body.bannerImage,
    tags: req.body.tags,
  };

  const validateName = (name) => {
    return name.length >= 3;
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateCPF = (cpfNumber) => {
    return cpf.isValid(cpfNumber);
  };

  const validateCNPJ = (cnpjNumber) => {
    return cnpj.isValid(cnpjNumber);
  };

  const isSchoolExists = async (schoolName) => {
    const existingSchool = await School.findOne({ name: schoolName });
    return !!existingSchool;
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Validate name field
  if (!validateName(req.body.name)) {
    return res
      .status(400)
      .json({ message: "Name should have at least 3 characters." });
  }

  // Validate email format
  if (!validateEmail(req.body.email)) {
    return res
      .status(400)
      .json({ message: "Please provide a valid email address." });
  }

  // Validate password length
  if (!validatePassword(req.body.password)) {
    return res
      .status(400)
      .json({ message: "Password should have at least 8 characters." });
  }

  // Validate CPF if the user is of type Student
  if (role === "Student" && !validateCPF(req.body.cpf)) {
    return res.status(400).json({ message: "Please provide a valid CPF." });
  }

  // Validate CNPJ if the user is of type School or Company
  if (
    (role === "School" || role === "Company") &&
    !validateCNPJ(req.body.cnpj)
  ) {
    return res.status(400).json({ message: "Please provide a valid CNPJ." });
  }

  if (role === "Student") {
    const schoolExists = await isSchoolExists(req.body.school);

    if (!schoolExists) {
      return res.status(200).json({
        message: `School "${req.body.school}" not found.`,
      });
    }
  }

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
    const userExists = await User.findOne({
      email: req.body.email,
      cpf: req.body.cpf,
      cnpj: req.body.cnpj,
    });

    // Check if a user exists

    if (userExists)
      return res.status(403).json({
        message: "User already exist!",
      });

    // Create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    user.password = passwordHash;

    // Save the specific user type document
    await user.save();

    res.json({ message: "Signup success! Please Login." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something's wrong happend. Try again later!" });
  }
  next();
};

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
    const user = await User.findOne({ _id: id });

    if (!user) {
      res.status(422).json({ message: "User not found." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// SignIn

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ message: "email is required!" });
  }
  if (!password) {
    return res.status(422).json({ message: "password is required!" });
  }

  const userSignUp = await User.findOne({
    email: email,
    cpf: req.body.cpf,
  });

  if (!userSignUp)
    return res.status(404).json({
      message: "User not found!",
    });

  const checkPassword = await bcrypt.compare(password, userSignUp.password);

  if (!checkPassword) {
    return res.status(422).json({ message: "Invalid password!" });
  }

  try {
    const token = jwt.sign(
      {
        _id: userSignUp._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "SignIn success! Welcome back!", token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something's wrong happened. Try again later!" });
  }
};

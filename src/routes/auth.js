const express = require("express");
const AuthController = require("../controllers/auth.controller");

const router = express.Router();

// POST Methods
router.post("/signup", AuthController.signup);

// GET Methods

router.get("/users", AuthController.allUsers);
router.get("/:id", AuthController.getUser);

module.exports = router;

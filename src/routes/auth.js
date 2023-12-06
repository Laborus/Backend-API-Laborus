const express = require("express");
const AuthController = require("../controllers/auth.controller");
const CampusController = require("../controllers/campus.controller");
const PostController = require("../controllers/post.controller");
const UserController = require("../controllers/user.controller");
// const ForgotPass = require("../controllers/forgot.controller");
const verifyToken = require("../controllers/verify.token");

const router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);

// Global Posts routes
router.get("/posts", PostController.getAllPosts);
router.post("/post", verifyToken, PostController.createPost);
router.get("/post/:id", PostController.getPostById);
router.put("/post/:id", verifyToken, PostController.editPost);
router.delete("/post/:id", verifyToken, PostController.deletePost);

// router.get("/campus/:schoolId", CampusController.getCampus);
router.post("/campus/:schoolId/posts", CampusController.createPost);
router.post("/events/:schoolId/posts", CampusController.createPost);

// User profile
router.put("/profile", verifyToken, UserController.editProfile);

// Password forgot and reset routes
// router.put("/forgot-password", ForgotPass.forgotPassword);
// router.put("/reset-password", ForgotPass.passwordResetValidator, resetPassword);

// router.get("/signout", AuthController.signout);

router.get("/users", AuthController.allUsers);
router.get("/:id", AuthController.getUser);

module.exports = router;

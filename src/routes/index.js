const router = require("express").Router();

// GET method - index route

router.get("/", (req, res) => {
  res.json({ message: "online" });
});

module.exports = router;

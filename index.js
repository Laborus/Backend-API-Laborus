const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/connect");

const app = express();
const PORT = process.env.PORT || 3333;

dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "active" });
});

connectToDatabase();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

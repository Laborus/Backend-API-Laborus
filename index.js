const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/connect");
const indexRouter = require("./src/routes/index");
const apiRouter = require("./src/routes/api");

const app = express();
const PORT = process.env.PORT || 3333;

dotenv.config();

// Route prefixes

app.use(express.json());
app.use("/", indexRouter);
app.use("/api/", apiRouter);

// DB connection

connectToDatabase();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

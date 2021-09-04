require("dotenv").config();
require("./database/index");

const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const authRouter = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: `http://localhost:8081`,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Meow" });
});

app.use("/api/auth/", authRouter);
app.use("/api/test/", userRoute);

app.listen(PORT, () => {
  console.log(
    chalk.bgBlue.bold(`Server is running on http://localhost:${PORT}`)
  );
});

const chalk = require("chalk");
const mongoose = require("mongoose");

const db_uri = process.env.DB_URI;

mongoose.connect(db_uri);

mongoose.connection.on("open", () => {
  console.log(chalk.bgGreen.bold("Connected to mongodb"));
});

mongoose.connection.on("error", (err) => console.error(err));

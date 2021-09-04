const { User } = require("../database/models");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

async function signup(req, res) {
  try {
    const hashedPassword = await argon2.hash(req.body.password);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    if (savedUser) {
      res.send({ message: "User was registered successfully!" });
    }
  } catch (err) {
    res.status(500).send({ message: err });
    console.error(err);
  }
}

async function signin(req, res) {
  try {
    const user = await User.findOne().byUsername(req.body.username);

    if (!user) {
      res.status(404).send({ message: "User not found." });
      return;
    }

    const passwordValid = await argon2.verify(user.password, req.body.password);
    if (!passwordValid) {
      res.status(401).send({
        accessToken: null,
        message: "Invalid password.",
      });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err });
    console.error(err);
  }
}

module.exports = {
  signin,
  signup,
};

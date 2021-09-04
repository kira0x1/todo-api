const { User } = require("../database/models");

async function checkDuplicateUsername(req, res, next) {
  try {
    const user = await User.findOne().byUsername(req.body.username);

    if (user) {
      res.status(400).send({ message: "Username is already taken" });
      return;
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err });
    throw new Error(err);
  }
}

async function checkDuplicateEmail(req, res, next) {
  try {
    const user = await User.findOne().byEmail(req.body.email);

    if (user) {
      res.status(400).send({ message: "Email is already taken" });
      return;
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err });
    throw new Error(err);
  }
}

const verifySignup = {
  checkDuplicateUsername,
  checkDuplicateEmail,
};

module.exports = verifySignup;

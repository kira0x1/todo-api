const { User } = require("../database/models");

function checkDuplicateUsername(req, res, next) {
  User.findOne()
    .byUsername(req.body.username)
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Username is already taken" });
        return;
      }

      next();
    });
}

function checkDuplicateEmail(req, res, next) {
  User.findOne()
    .byEmail(req.body.email)
    .exec((err, email) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (email) {
        res.status(400).send({ message: "Email is already taken" });
        return;
      }

      next();
    });
}

const verifySignup = {
  checkDuplicateUsername,
  checkDuplicateEmail,
};

module.exports = verifySignup;

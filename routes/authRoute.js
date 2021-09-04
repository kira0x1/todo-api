const controller = require("../controllers/authController");
const { verifySignup } = require("../middlewares");
const express = require("express");

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token",
    "Origin",
    "Content-Type",
    "Accept"
  );

  next();
});

router.post(
  "/signup",
  [verifySignup.checkDuplicateEmail, verifySignup.checkDuplicateUsername],
  controller.signup
);

router.post("/signin", controller.signin);

module.exports = router;

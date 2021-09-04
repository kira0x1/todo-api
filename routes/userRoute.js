const express = require("express");
const { verifyToken } = require("../middlewares");
const controller = require("../controllers/userController");

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );

  next();
});

router.get("/all", controller.allAccess);
router.get("/user", [verifyToken], controller.userBoard);

module.exports = router;

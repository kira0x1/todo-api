const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(403).send({ message: "No token provided!" });
    return;
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: "Unauthorized!" });
      return;
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;

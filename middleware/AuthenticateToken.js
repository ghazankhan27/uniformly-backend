// Import dependencies

const jwt = require("jsonwebtoken");

// Functions

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(400).send({ message: "Token is required" });

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(401).send({ message: "Unauthorized" });

    req.user = user;
    next();
  });
};

// Export function

module.exports = authenticateToken;

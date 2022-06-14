// Import all dependencies

const jwt = require("jsonwebtoken");
const users = require("./users");

// ---- Functions ----

// Login function

const getName = (req, res) => {
  temp = users.filter((user) => user.email == req.user.email);

  res.status(200).send({ name: temp[0].data.name });
};

module.exports = {
  getName,
};

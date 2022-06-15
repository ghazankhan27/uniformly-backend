// Import all dependencies

const jwt = require("jsonwebtoken");
const users = require("./users");

// ---- Functions ----

// Login function

const getName = (req, res) => {
  temp = users.filter((user) => user.email == req.user.email);

  let _name = temp[0].name;

  res.status(200).send({ name: _name });
};

module.exports = {
  getName,
};

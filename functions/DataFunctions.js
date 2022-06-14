// Import all dependencies

const jwt = require("jsonwebtoken");
const users = require("./users");

// ---- Functions ----

// Login function

const getName = (req, res) => {
  console.log(req.user.email);
  temp = users.filter((user) => user.email == req.user.email);

  res.status(200).send({ name: temp[0].name });
};

module.exports = {
  getName,
};

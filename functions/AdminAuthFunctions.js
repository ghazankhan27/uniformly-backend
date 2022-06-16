// Import all dependencies

const jwt = require("jsonwebtoken");
const admin = require("./admin");
const bcrypt = require("bcrypt");

// ---- Functions ----

// Login function

const login = async (req, res) => {
  if (req.body.username.length == 0 || req.body.password.length == 0)
    return res.status(400).send({ message: "No credentials" });

  if (req.body.username != admin.username) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  if (!(await bcrypt.compare(req.body.password, admin.password))) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  res.status(200).send({ message: "Success" });
};

const changePass = async (req, res) => {};

module.exports = {
  login,
  changePass,
};

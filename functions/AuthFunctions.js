// Import all dependencies

const jwt = require("jsonwebtoken");
const users = require("./users");
const bcrypt = require("bcrypt");

// ---- Functions ----

// Login function

const login = (req, res) => {
  if (req.body.email.length == 0 || req.body.password.length == 0)
    return res.status(400).send({ message: "No credentials" });

  let user = {};

  for (let i = 0; i < users.length; i++) {
    if (req.body.email == users[i].email) {
      user = users[i];
      break;
    }
  }

  if (!user) return res.status(404).send({ message: "User does not exist" });

  if (req.body.password != user.password)
    return res.status(403).send({ message: "Wrong email or password" });

  const token = jwt.sign(req.body, process.env.SECRET);
  res.status(200).send({ token: token });
};

const register = async (req, res) => {
  if (
    req.body.email.length == 0 ||
    req.body.password.length == 0 ||
    req.body.name.length == 0
  )
    return res.status(400).send({ message: "No inputs" });

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  let user = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };

  for (let i = 0; i < users.length; i++) {
    console.log(user.email, users[i].email);
    if (user.email === users[i].email) {
      return res.status(403).send({ message: "Already exists" });
    }
  }

  users.push(user);

  res.status(201).send({ message: "Created" });
};

module.exports = {
  login,
  register,
};

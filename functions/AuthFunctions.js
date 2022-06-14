// Import all dependencies

const jwt = require("jsonwebtoken");
const users = require("./users");

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

module.exports = {
  login,
};

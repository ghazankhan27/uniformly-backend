const users = [
  {
    email: "ghazankhan27@hotmail.com",
    password: "123456789",
    data: {
      name: "Ghazan",
      age: 22,
      location: "Islamabad",
    },
  },
  {
    email: "ghazankhan227@hotmail.com",
    password: "1234567811119",
    data: {
      name: "Ghazan",
      age: 24,
      location: "Islamabad",
    },
  },
];

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(400).send({ message: "Token is required" });

  jwt.verify(token, "secret", (err, user) => {
    if (err) return res.status(401).send({ message: "Unauthorized" });

    req.user = user;
    next();
  });
};

app.get("/data", authenticateToken, (req, res) => {
  temp = users.filter((data) => data.email == req.user.email);

  res.send(temp[0].data);
});

app.post("/login", (req, res) => {
  if (req.body.email.length == 0 || req.body.password.length == 0)
    return res.status(400).send({ message: "No credentials" });

  let user = {};

  for (let i = 0; i < users.length; i++) {
    if (req.body.email == users[i].email) {
      user = users[i];
      break;
    }
  }

  if (!user) return res.status(404).send({ message: "Email does not exist" });

  if (req.body.password != user.password)
    return res.status(403).send({ message: "Wrong email or password" });

  const token = jwt.sign(req.body, "secret");
  res.status(200).send({ token: token });
});

app.listen(8000);

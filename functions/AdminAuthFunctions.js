// Import all dependencies

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../dbConn");

// ---- Functions ----

// ----- Login function ----- //

const login = async (req, res) => {
  // -- Reject empy inputs -- /

  if (req.body.username.length == 0 || req.body.password.length == 0)
    return res.status(400).send({ message: "No credentials" });

  try {
    // -- Get the admin creds from db -- //

    const adminAuth = await db.one(
      "SELECT * FROM admin WHERE name = $<username>",
      {
        username: req.body.username,
      }
    );

    // -- Check if admin exists -- //

    if (!adminAuth) {
      return res.status(403).send({ message: "Unauthorized" });
    }

    // -- Verify admin's password -- //

    if (!(await bcrypt.compare(req.body.password, adminAuth.password))) {
      return res.status(403).send({ message: "Unauthorized" });
    }

    // -- Successful login -- //

    return res.status(200).send({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(403).send({ message: "Unauthorized" });
  }
};

const changePass = async (req, res) => {};

module.exports = {
  login,
  changePass,
};

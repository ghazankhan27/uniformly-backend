// Import all dependencies

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../dbConn");

// ---- Functions ----

// ----- Login function ----- //

const login = async (req, res) => {
  // -- Reject empty inputs -- //
  if (req.body.email.length == 0 || req.body.password.length == 0)
    return res.status(400).send({ message: "No credentials" });

  try {
    // -- Check if email is registered -- //

    const user = await db.oneOrNone(
      "SELECT * FROM student WHERE email = $<email>",
      {
        email: req.body.email,
      }
    );

    if (!user)
      return res.status(404).send({
        message: "User does not exist, sign up before you can login.",
      });

    // -- //

    // -- Compare hashed password -- //

    if (!(await bcrypt.compare(req.body.password, user.password)))
      return res.status(403).send({ message: "Wrong email or password" });

    // -- //

    // -- Create a user object to sign with the jwt -- //

    const _user = {
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(_user, process.env.SECRET);

    // -- //

    // -- Successful login -- //

    return res.status(200).send({ token: token, name: user.name });

    // -- //
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "There was a problem signing in" });
  }
};

// ----- Register function ----- //

const register = async (req, res) => {
  // -- Make sure inputs are not empty -- //

  if (
    req.body.email.length == 0 ||
    req.body.password.length == 0 ||
    req.body.name.length == 0
  )
    return res.status(400).send({ message: "No inputs" });

  // -- //

  // -- Hash the password before inserting in the database -- //

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // -- //

  // -- Create a user object for insertion into database -- //

  let user = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };

  // -- //

  try {
    if (
      !(await db.task(async (t) => {
        // -- Check if user already exists by matching email -- //

        const check = await t.oneOrNone(
          "SELECT email FROM student WHERE email = $<email>",
          { email: req.body.email }
        );

        if (check !== null)
          return res.status(403).send({ message: "User already exists" });

        // -- //

        // -- Insert a new user if email does not already exists -- //

        if (
          !(await t.any(
            "INSERT INTO student ( name, email, password ) " +
              "VALUES ( $<name>, $<email>, $<password> ) ",
            user
          ))
        )
          return res.status(403).send({ message: "Unable to register user" });

        return res.status(201).send({ message: "Created" });

        // -- //
      }))
    )
      return res
        .status(500)
        .send({ message: "Something went wrong while registering" });

    // -- Registration Successful -- //

    // -- //
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Something went wrong while registering" });
  }
};

// ----- Token authentication ----- //

const authenticateToken = (req, res) => {
  // -- Get token from the request end -- //
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // -- //

  // -- Return user information if token is valid -- //

  if (token == null)
    return res.status(400).send({ message: "Token is required" });

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(401).send({ message: "Unauthorized" });

    return res.status(200).send({ message: true, user: user });
  });

  // -- //
};

module.exports = {
  login,
  register,
  authenticateToken,
};

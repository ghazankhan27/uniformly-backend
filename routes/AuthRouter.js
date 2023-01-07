// Import dependencies

const express = require("express");
const {
  login,
  register,
  authenticateToken,
} = require("../controllers/AuthController");

// Get express router

const router = express.Router();

// Routes

router.post("/login", login);
router.post("/register", register);
router.post("/authenticate", authenticateToken);

// Export the router

module.exports = router;

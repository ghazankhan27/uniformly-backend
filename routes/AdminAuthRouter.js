// Import dependencies

const express = require("express");
const functions = require("../controllers/AdminAuthController");

// Get express router

const router = express.Router();

// Routes

router.post("/login", functions.login);
router.post("/pwd", functions.changePass);

// Export the router

module.exports = router;

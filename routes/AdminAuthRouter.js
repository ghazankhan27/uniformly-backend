// Import dependencies

const express = require("express");
const functions = require("../functions/AdminAuthFunctions");

// Get express router

const router = express.Router();

// Routes

router.post("/login", functions.login);
router.post("/pwd", functions.changePass);

// Export the router

module.exports = router;

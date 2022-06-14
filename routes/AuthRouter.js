// Import dependencies

const express = require("express");
const functions = require("../functions/AuthFunctions");

// Get express router

const router = express.Router();

// Routes

router.post("/login", functions.login);

// Export the router

module.exports = router;

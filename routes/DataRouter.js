// Import dependencies

const express = require("express");
const functions = require("../functions/DataFunctions");
const authenticateToken = require("../middleware/AuthenticateToken");

// Get express router

const router = express.Router();

// Routes

router.get("/name", authenticateToken, functions.getName);

// Export the router

module.exports = router;

// Import dependencies

const express = require("express");
const { getName } = require("../controllers/DataController");
const authenticateToken = require("../middleware/AuthenticateToken");

// Get express router

const router = express.Router();

// Routes

router.get("/name", authenticateToken, getName);

// Export the router

module.exports = router;

// Import dependencies

const pgp = require("pg-promise")();

// Create connection

const db = pgp(process.env.DBCONN);

// Returning the connection

module.exports = db;

// Import environment variables

require("dotenv").config();

// Import all required

const express = require("express");
const cors = require("cors");
const AuthRouter = require("./routes/AuthRouter");
const DataRouter = require("./routes/DataRouter");
const AdminAuthRouter = require("./routes/AdminAuthRouter");

// Get express app

const app = express();

// Middleware

app.use(cors());
app.use(express.json());

// Routes

app.use("/auth", AuthRouter);
app.use("/data", DataRouter);
app.use("/admin", AdminAuthRouter);

// Starting server

app.listen(8000);

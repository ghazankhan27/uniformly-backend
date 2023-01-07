// Import environment variables

require("dotenv").config();

// Import all required

const express = require("express");
const cors = require("cors");
const AuthRouter = require("./routes/AuthRouter");
const DataRouter = require("./routes/DataRouter");
const AdminAuthRouter = require("./routes/AdminAuthRouter");
const UniversityRouter = require("./routes/UniversityRouter");
const DepartmentRouter = require("./routes/DepartmentRouter");

// Get express app

const app = express();

// Middleware

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("./uploads"));

// Routes

app.use("/auth", AuthRouter);
app.use("/data", DataRouter);
app.use("/university", UniversityRouter);
app.use("/admin", AdminAuthRouter);
app.use("/department", DepartmentRouter);

// Starting server

app.listen(8000);

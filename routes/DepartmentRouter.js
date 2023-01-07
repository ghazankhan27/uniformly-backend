// Import dependencies

const express = require("express");
const {
  addNewDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/DepartmentController");
const multer = require("multer");

const upload = multer({});

// Get express router

const router = express.Router();

// Routes

router.get("/all", getAllDepartments);
router.post("/add", upload.none(), addNewDepartment);
router.put("/update", upload.none(), updateDepartment);
router.delete("/delete/:id", deleteDepartment);

// Export the router

module.exports = router;

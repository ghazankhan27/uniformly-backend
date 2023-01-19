// Import dependencies

const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  addNewUniversity,
  getAllUniversities,
  updateUniversity,
  deleteUniversity,
  getUniversityById,
} = require("../controllers/UniversityController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if ([".jpg", ".png"].includes(path.extname(file.originalname))) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

// Get express router

const router = express.Router();

// Routes

router.get("/all", getAllUniversities);
router.get("/all/:id", getUniversityById);
router.post("/add", upload.single("image"), addNewUniversity);
router.put("/update", upload.none(), updateUniversity);
router.delete("/delete/:id", deleteUniversity);

// Export the router

module.exports = router;

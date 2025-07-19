import express from "express";
import multer from "multer";
import { uploadReport, getMyReports, getAllReports } from "../controllers/reportController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/upload", protect, upload.single("file"), uploadReport);

// ✅ **Fetch reports route**
router.get("/myreports", protect, getMyReports);
router.get("/allreports", protect, getAllReports);

export default router;

import Report from "../models/Report.js";

// Upload report controller (already implemented)
export const uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const newReport = new Report({
      patient: req.user._id, // ✅ logged-in user id from middleware
      filename: req.file.filename,
      originalName: req.file.originalname,
      fileType: req.file.mimetype,
    });

    await newReport.save();

    res.status(201).json(newReport);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to upload report" });
  }
};



// ✅ **Fetch reports of logged-in patient**
export const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ patient: req.user._id });

    res.status(200).json(reports);
  } catch (err) {
    console.error("Fetch reports error:", err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};

export const getAllReports = async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ error: "Access denied" });
    }

    const reports = await Report.find().populate("patient", "name email");
    res.json(reports);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch all reports" });
  }
};
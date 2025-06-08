import multer from "multer";
import path from "path";
import fs from "fs";

const tempDir = "temp";

// Check if temp directory exists, if not, create it
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

const storage = multer.diskStorage({
  // Set destination folder for uploaded files (temp directory)
  destination: (req, file, cb) => {
    cb(null, tempDir); // ✅ Save to temp directory
  },
  // Create a unique filename to avoid conflicts
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Export multer middleware configured with this storage option
export const upload = multer({ storage });

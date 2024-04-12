import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI; // Update your environment variable name to reflect the MongoDB URI
if (!uri) {
  throw new Error("MongoDB URI is not provided in the environment variables.");
}

const storage = new GridFsStorage({
  url: uri,
  options: { useNewUrlParser: true, useUnifiedTopology: true }, // Add useUnifiedTopology option
  file: (request, file) => {
    const match = ["image/png", "image/jpeg"]; // Corrected typo from "image/jpg" to "image/jpeg"

    if (match.indexOf(file.mimetype) === -1) {
      // Corrected typo from "file.memeType" to "file.mimetype"
      return `${Date.now()}-blog-${file.originalname}`; // remove duplicate image
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

export default upload;

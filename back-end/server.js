// Import required modules
const express = require("express");
const multer = require("multer");
const zlib = require("zlib");
const crypto = require("crypto");
const path = require("path");

// Initialize Express app
const app = express();

// Set up middleware
//app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, "/public")));

// Set up multer for handling file uploads
const upload = multer();

// Endpoint for file upload
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    // Get file buffer from request
    const fileBuffer = req.file.buffer;

    // Check if file exists
    if (!fileBuffer) {
      res.status(400).send("No file uploaded.");
      return;
    }

    // Compress file using zlib
    zlib.gzip(fileBuffer, (err, compressedData) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error compressing file.");
        return;
      }

      // Encrypt file using crypto
      const algorithm = "aes256";
      const iv = crypto.randomBytes(16);
      const salt = crypto.randomBytes(16);
      const key = crypto.pbkdf2Sync(
        "password", // change this !
        salt,
        10000,
        32,
        "sha512"
      );
      const cipher = crypto.createCipheriv(algorithm, key, iv);

      const encryptedData = Buffer.concat([
        cipher.update(compressedData),
        cipher.final(),
      ]);

      // Send encrypted data as response
      res.send(encryptedData);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

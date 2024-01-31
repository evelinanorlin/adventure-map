const express = require('express');
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

router.post("/upload", upload.single("file"), async (req, res) => {
 const data = req.body.file;
 try{
  const result = await handleUpload(data);
  res.status(200).json(result);
 } catch(err){
  console.log(err);
  res.status(500).json(err);
 }
});

module.exports = router;
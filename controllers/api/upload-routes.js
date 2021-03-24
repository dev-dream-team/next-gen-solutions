require("dotenv").config();
const router = require("express").Router();
const fs = require("fs");
const FormData = require("form-data");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
const formData = new FormData();
const withAuth = require("../../utils/helpers/auth");

//  multer middleware will write to a folder called 'uploads/'
//  read  it and send it to your callback function
// router.post("/", withAuth, upload.single("file"), async (req, res) => {
router.post("/", upload.single("file"), async (req, res) => {
  formData.append("file", req.file.path);
  formData.append("upload_preset", "docs_upload_unsigned_us_preset");

  // uploads img to cloudinary account using env vars stored in .env file
  // you can find account  details here: https://cloudinary.com/console/c-017325a8b771f00559c55807ca5cd9
  const cloudinary = require("cloudinary").v2;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const upload = await cloudinary.uploader.upload(
    req.file.path,
    (error, result) => {
      if (error) console.error(error);
      return result;
    }
  );
  // TODO: remove hardcoding and auth request once integrated with other routes
  // upload.user_id = req.session.user_id;
  upload.user_id = 1;
  res.json(upload);
  fs.unlink(req.file.path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //file removed
  });
});

module.exports = router;

const bcrypt = require("bcryptjs");
const File = require("../models/File");
const multer = require("multer");
const express = require('express');
const router = express.Router();

const upload = multer({ dest: "uploads" });

router.post("",  upload.single("file"), handleUpload);

module.exports = router;

async function handleUpload(req, res, next) {
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname,
  }

  // if there is a password hash that shit
  if (req.body.password != null && req.body.password !== "") {
    fileData.password = bcrypt.hashSync(req.body.password, 10);
  }

  // pass the fileData object to the mongoose
  // schema and insert value into db
  const file = await File.create(fileData);

  // render fileLink to index view
  res.render("index", { fileLink: `${req.headers.origin}/file/${file.id}` });
}

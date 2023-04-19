const bcrypt = require("bcryptjs");
const File = require("../models/File");
const express = require('express');
const router = express.Router();

router.get("/:id", handleGetDownload);
router.post("/:id", handlePostDownload);

module.exports = router;

async function handleGetDownload(req, res, next) {
  const file = await File.findById(req.params.id);
  console.log('file', file); // eslint-disable-line
  res.render("download", { file: JSON.stringify(file) });
}

async function handlePostDownload(req, res, next) {
  const file = await File.findById(req.params.id);

  if (file.password != null) {
    if (req.body.password == null) {
      res.render("download", { errorNoPassword: true });
      return;
    }

    if (!(bcrypt.compareSync(req.body.password, file.password))) {
      res.render("download", { errorIncorrectPassword: true })
      return;
    }
  }

  file.downloadCount++

  await file.save();

  // res.download(file.path, file.originalName);

  const imgPath = `/${file.path}`;
  console.log('fileObject', file);
  console.log('pathObject', imgPath);
  res.render("download", { success: true, file: file, imgPath: imgPath });
}

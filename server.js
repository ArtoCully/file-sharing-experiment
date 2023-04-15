require("dotenv").config();
const multer = require("multer");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const File = require("./models/File");

const express = require("express");
const app = express();

mongoose.connect(process.env.DATABASE_URL);

const upload = multer({ dest: "uploads" });

// use urlencoded middleware
app.use(express.urlencoded({ extended: true }));

// set view engine to EJS
app.use("view engine", "ejs");

// set initial route to index
app.get("/", (req, res) => {
  res.render("index");
});

// set POST upload file
app.post("/upload", upload.single("file"), async (req, res) => {
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname,
  }

  // if there is a password hash that shit
  if (req.body.password != null && req.body.password !== "") {
    fileData.password = await bcrypt.hash(req.body.password, 10);
  }

  // pass the fileData object to the mongoose
  // schema and insert value into db
  const file = await File.create(fileData);

  // render fileLink to index view
  res.render("index", { fileLink: `${req.headers.origin}/file/${file.id}` });
});

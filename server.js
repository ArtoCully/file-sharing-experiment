require("dotenv").config();
const mongoose = require("mongoose");
const HomeController = require("./controllers/home");
const DownloadController = require("./controllers/download");
const UploadController = require("./controllers/upload");
const express = require("express");
const app = express();

mongoose.connect(process.env.DATABASE_URL);
mongoose.set('strictQuery', false);

// use urlencoded middleware
app.use(express.urlencoded({ extended: true }));

// set static uploads file
app.use("/uploads", express.static(__dirname + "/uploads"));

// set view engine to EJS
app.set("view engine", "ejs");

// ROUTES
app.use("/", HomeController);
app.use("/file", DownloadController);
app.use("/upload", UploadController);

app.listen(process.env.PORT);

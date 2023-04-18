const express = require('express');
const router = express.Router();

router.get("", handleHomepage);

module.exports = router;

async function handleHomepage(req, res, next) {
  res.render("index");
}

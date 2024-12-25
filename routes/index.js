const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ msg: "Work from index.js" });
});

module.exports = router;

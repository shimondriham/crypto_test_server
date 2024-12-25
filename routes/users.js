const express = require("express");
const router = express.Router();
const { auth, genToken } = require("../middlewares/auth");
const jwt = require("jsonwebtoken");


router.get("/", (req, res, next) => {
  res.json({ msg: "Work from users.js " });
});


// check if the user have a good token 
router.get("/checkToken", auth, async (req, res) => {
  res.json(true)
})


// login
router.post("/login", (req, res) => {
  try {
    if (req.body.email == "test@gmail.com" && req.body.password == "1234") {
      let _token = jwt.sign({ email: req.body.email }, "test22", { expiresIn: "1440mins" });
      res.json({ token: _token });
    }
    else {
      return res.status(401).json({ err: "User or password is wrong" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
})

module.exports = router;
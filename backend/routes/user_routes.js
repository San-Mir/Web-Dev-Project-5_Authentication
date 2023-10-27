const express = require("express");
const {
  login,
  signup,
  verifyToken,
  getUser,
  refreshToken,
  logout,
} = require("../controllers/user-controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken, verifyToken);
router.post("/logout", verifyToken, logout);
module.exports = router;

const express = require("express");
const router = express.Router();
const { validateRegistration } = require("../services/validateRegistration");
const {
  userRegister,
  userLogin,
  userInfoUpdate,
} = require("../controllers/authController");
const { authentication } = require("../middlewares/authMiddleware");

router.post("/user/register", validateRegistration, userRegister);
router.post("/user/login", userLogin);
router.put("/user/info-update", authentication, userInfoUpdate);
module.exports = router;

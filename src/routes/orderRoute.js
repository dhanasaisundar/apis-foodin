const express = require("express");
const router = express.Router();
const { authentication } = require("../middlewares/authMiddleware");
const {
  storeOrders,
  getUserOrdersInfo,
} = require("../controllers/orderController");

router.get("/get/user-orders/:userId", getUserOrdersInfo);
router.post("/post/user-orders", authentication, storeOrders);

module.exports = router;

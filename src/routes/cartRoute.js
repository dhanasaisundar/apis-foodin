const express = require("express");
const router = express.Router();
const { authentication } = require("../middlewares/authMiddleware");
const {
  addItemToCart,
  deleteItemFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = require("../controllers/cartController");

router.post("/cart/add", authentication, addItemToCart);
router.delete("/cart/delete", authentication, deleteItemFromCart);
router.put("/cart/increase", authentication, increaseQuantity);
router.put("/cart/decrease", authentication, decreaseQuantity);
router.delete("/cart/clear", authentication, clearCart);
module.exports = router;

const {
  addCartItems,
  deleteCartItems,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCartByCartId,
} = require("../models/leetDatabase");

const addItemToCart = async (req, res) => {
  try {
    const { cartId, item } = req.body;
    await addCartItems(cartId, item);
    return res.status(200).send({ message: "Item added to cart" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteItemFromCart = async (req, res) => {
  try {
    const { cartId, item } = req.body;
    await deleteCartItems(cartId, item);
    return res.status(200).send({ message: "Item deleted from cart" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const increaseQuantity = async (req, res) => {
  try {
    const { cartId, itemId } = req.body;
    await increaseItemQuantity(cartId, itemId);
    return res.status(200).send({ message: "Item added to cart" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const decreaseQuantity = async (req, res) => {
  try {
    const { cartId, itemId } = req.body;
    await decreaseItemQuantity(cartId, itemId);
    return res.status(200).send({ message: "Item deleted from cart" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const { cartId } = req.body;
    await clearCartByCartId(cartId);
    return res.status(200).send({ message: "Cart cleared" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addItemToCart,
  deleteItemFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
};

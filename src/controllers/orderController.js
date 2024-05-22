const { v4: uuidv4 } = require("uuid");
const {
  insertUserOrderInfo,
  insertOrderItems,
  getUserOrderDetails,
  getUserOrders,
} = require("../models/leetDatabase");
const storeOrders = async (req, res) => {
  try {
    const { cart, userId, totalCartPrice, totalPaid, totalQuantity } = req.body;
    const orderId = uuidv4();
    await insertUserOrderInfo(
      orderId,
      userId,
      totalCartPrice,
      totalQuantity,
      totalPaid
    );
    for (let i = 0; i < cart.length; i++) {
      await insertOrderItems(cart[i], orderId);
    }
    res.status(200).send({ message: "Order created successfully." });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
//#######################################################################
const getUserOrdersInfo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orderDetails = await getUserOrderDetails(userId);
    let totalOrders = [];
    for (let i = 0; i < orderDetails?.length; i++) {
      const orders = await getUserOrders(orderDetails[i]?.items.orderId);
      totalOrders.push(orders);
    }
    res.status(200).json({ orderDetails, totalOrders });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { storeOrders, getUserOrdersInfo };

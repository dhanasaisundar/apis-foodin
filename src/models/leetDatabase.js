const dotenv = require("dotenv");
dotenv.config();
const pool = require("../../dbConfig.js");

// ###################################################################################################
async function createUser(username, password, email) {
  const [result] = await pool.query(
    `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
    [username, password, email]
  );

  return result.insertId;
}
// ###################################################################################################
async function getUserByEmail(email) {
  const [result] = await pool.query(
    `SELECT * FROM users WHERE email = ?`,
    email
  );
  return result;
}
// ###################################################################################################
async function getCartByUserId(userId) {
  const [result] = await pool.query(
    `SELECT id FROM cart WHERE user_id = ?`,
    userId
  );
  return result;
}
// ###################################################################################################
async function updateUser(
  userId,
  username,
  email,
  address1,
  address2,
  city,
  state,
  country,
  pincode,
  phoneNumber
) {
  await pool.query(
    "UPDATE users SET username = ?, email = ?, address1 = ?,address2 = ?,  city = ?, state = ?, country = ?, pincode = ?, phone_number = ? WHERE id = ?",
    [
      username,
      email,
      address1,
      address2,
      city,
      state,
      country,
      pincode,
      phoneNumber,
      userId,
    ]
  );
}
// ###################################################################################################
async function getCartByCartId(cartId) {
  const [result] = await pool.query(
    `SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
          'id', id,
          'cart_id', cart_id,
          'itemId', itemId,
          'image', image,
          'name', name,
          'quantity', quantity,
          'unitprice', unitprice,
          'totalPrice', totalPrice
      ) 
  ) AS items
FROM cart_items
WHERE cart_id = ?;`,
    [cartId]
  );
  return result[0].items;
}

// ###################################################################################################
async function createCart(userId) {
  const [cartResult] = await pool.query(
    `INSERT INTO cart (user_id) VALUES (?)`,
    [userId]
  );
  return cartResult.insertId;
}
// ###################################################################################################
async function addCartItems(cartId, item) {
  await pool.query(
    `INSERT INTO cart_items (cart_id, itemId, image, name, quantity, unitprice, totalPrice) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      cartId,
      item.itemId,
      item.image,
      item.name,
      item.quantity,
      item.unitprice,
      item.totalPrice,
    ]
  );
}
// ###################################################################################################

async function deleteCartItems(cartId, itemId) {
  await pool.query(`DELETE FROM cart_items WHERE cart_id = ? AND itemId = ?`, [
    cartId,
    itemId,
  ]);
}
// ###################################################################################################

async function increaseItemQuantity(cartId, itemId) {
  await pool.query(
    `UPDATE cart_items SET quantity = quantity + 1 WHERE cart_id = ? AND itemId = ?`,
    [cartId, itemId]
  );
}

// ###################################################################################################

async function decreaseItemQuantity(cartId, itemId) {
  await pool.query(
    `UPDATE cart_items SET quantity = quantity - 1 WHERE cart_id = ? AND itemId = ?`,
    [cartId, itemId]
  );
}

// ###################################################################################################
async function clearCartByCartId(cartId) {
  await pool.query(`DELETE FROM cart_items WHERE cart_id = ?`, [cartId]);
}
// ###################################################################################################

async function getDrinks() {
  const [drinks] = await pool.query(`SELECT 
  id AS drinkId,
  name,
  unitprice,
  quantity,
  soldout,
  imageUrl 
  FROM 
    drinks;
  `);
  return drinks;
}
// ###################################################################################################
async function insertUserOrderInfo(
  orderId,
  userId,
  totalCartPrice,
  totalQuantity,
  totalPaid
) {
  await pool.query(
    `INSERT INTO orders (order_id, user_id, order_price, total_paid, total_quantity) VALUES (?, ?, ?, ?, ?)`,
    [orderId, userId, totalCartPrice, totalPaid, totalQuantity]
  );
}
// ###################################################################################################
async function insertOrderItems(item, orderId) {
  await pool.query(
    `INSERT INTO order_items (order_id, itemId, image, name, quantity, unitprice, totalPrice) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      orderId,
      item.itemId,
      item.image,
      item.name,
      item.quantity,
      item.unitprice,
      item.totalPrice,
    ]
  );
}

async function getUserOrderDetails(userId) {
  const [orderInfo] = await pool.query(
    `SELECT 
      JSON_OBJECT(
          'orderId', order_id,
          'orderPrice', order_price,
          'totalPaid', total_paid,
          'totalQuantity', total_quantity,
          'status', status,
          'createdAt', created_at
      ) AS items
      FROM orders
      WHERE user_id = ?;`,
    [userId]
  );
  return orderInfo;
}

// ###################################################################################################
async function getUserOrders(orderId) {
  const [orders] = await pool.query(
    `SELECT order_id as orderId, itemId, image, name, quantity, unitprice, totalPrice FROM order_items WHERE order_id = ?`,
    [orderId]
  );
  return orders;
}

// ###################################################################################################
module.exports = {
  createUser,
  createCart,
  getUserByEmail,
  getCartByUserId,
  getCartByCartId,
  updateUser,
  addCartItems,
  deleteCartItems,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCartByCartId,
  getDrinks,
  insertUserOrderInfo,
  insertOrderItems,
  getUserOrderDetails,
  getUserOrders,
};

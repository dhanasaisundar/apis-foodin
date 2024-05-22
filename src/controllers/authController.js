const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  createUser,
  getUser,
  getUserByEmail,
  updateUser,
  createCart,
  getCartByUserId,
  getCartByCartId,
} = require("../models/leetDatabase");

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(username, hashedPassword, email);
    await createCart(userId);
    res.status(200).send({ message: "User created successfully." });
  } catch (error) {
    res.status(500).send({ message: "Failed to create user." + error.message });
  }
};

// ###################################################################################################

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await getUserByEmail(email);
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password." });
    }
    const [cartId] = await getCartByUserId(user.id);
    if (!cartId) {
      return res.status(401).send({ message: "Error fetching cart." });
    }
    const cart = await getCartByCartId(cartId.id);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const userInfo = {
        userId: user.id,
        username: user.username,
        email: user.email,
        address1: user.address1,
        address2: user.address2,
        city: user.city,
        state: user.state,
        country: user.country,
        pincode: user.pincode,
        phoneNumber: user.phone_number,
      };
      const payload = { userInfo, cartId: cartId.id, cart };
      const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
      return res
        .status(200)
        .json({ token: jwtToken, message: "Logged in successfully" });
    } else {
      return res.status(401).send({ message: "Invalid email or password." });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// ###################################################################################################

const userInfoUpdate = async (req, res) => {
  try {
    const userInfo = req.body;
    const {
      userId,
      username,
      email,
      address1,
      address2,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    } = userInfo;
    await updateUser(
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
    );
    return res.status(200).send({ message: "User info updated successfully." });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// ###################################################################################################

module.exports = {
  userRegister,
  userLogin,
  userInfoUpdate,
};

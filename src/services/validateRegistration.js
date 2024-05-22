const { getUserByEmail } = require("../models/leetDatabase");

async function validateRegistration(req, res, next) {
  const { username, password, confirmPassword, email } = req.body;
  if (!username || !password || !email) {
    return res
      .status(400)
      .send({ message: "Username, password, and email are required!" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match!" });
  }

  try {
    const isExistingUser = await getUserByEmail(email);
    if (isExistingUser.length > 0) {
      return res
        .status(409)
        .send({ message: "User already exists. Please login to continue!" });
    }
    next();
  } catch (error) {
    console.error("Error checking user:", error);
    res
      .status(500)
      .send({ message: "Failed to validate user. Please try again!" });
  }
}

module.exports = {
  validateRegistration,
};

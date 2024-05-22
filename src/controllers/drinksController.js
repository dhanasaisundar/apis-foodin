const { getDrinks } = require("../models/leetDatabase");

const drinks = async (_, res) => {
  try {
    const drinks = await getDrinks();
    res.status(200).send(drinks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = drinks;

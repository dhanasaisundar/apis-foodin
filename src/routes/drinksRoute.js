const express = require("express");
const router = express.Router();
const drinks = require("../controllers/drinksController");
router.get("/drinks", drinks);
module.exports = router;

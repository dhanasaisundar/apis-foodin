const router = require("express").Router();
const payments = require("../controllers/paymentsController");

router.post("/payments/create-checkout-session", payments);
module.exports = router;

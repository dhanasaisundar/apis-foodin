const express = require("express");
const cors = require("cors");
const authRoute = require("./src/routes/authRoute");
const cartRoute = require("./src/routes/cartRoute");
const paymentsRoute = require("./src/routes/paymentRoute");
const drinksRoute = require("./src/routes/drinksRoute");
const orderRoute = require("./src/routes/orderRoute");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", authRoute);
app.use("/api", cartRoute);
app.use("/api", paymentsRoute);
app.use("/api", drinksRoute);
app.use("/api", orderRoute);

app.listen(port, function () {
  console.log("Server is running at port " + port);
});

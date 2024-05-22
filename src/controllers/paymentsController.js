const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const payments = async (req, res) => {
  try {
    const { products /*, customer*/ } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid products data" });
    }
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "INR",
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(product.totalPrice * 100),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        ...lineItems,
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Delivery Fee",
            },
            unit_amount: Math.round(5 * 100), // Convert 5 INR to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/payment/successfull",
      cancel_url: "http://localhost:5173/payment/cancel",
      //customer: customer,
      //4000003560000123
    });
    res.json({ id: session.id });
  } catch (error) {
    // console.error("Error creating Stripe checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

module.exports = payments;

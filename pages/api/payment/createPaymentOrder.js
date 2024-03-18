import main from "../../../database/conn";
const RazorpayBackend = require("razorpay");
const instance = new RazorpayBackend({
  key_id: process.env.RAZORPAY_KEY_ID, // YOUR RAZORPAY KEY
  key_secret: process.env.RAZORPAY_SECRET, // YOUR RAZORPAY SECRET
});

const createPaymentOrder = async (req, res) => {
  const { total } = req.body;
  try {
    // Connect to database
    await main().catch((err) => console.error(err));

    var options = {
      amount: total * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
      payment_capture: 1,
    };
    instance.orders.create(options, function (err, order) {
      if (err) {
        return res.send(err);
      } else {
        return res.json(order);
      }
    });
  } catch (error) {
    console.log({ error });
    return res.send(error);
  }
};

export default createPaymentOrder;

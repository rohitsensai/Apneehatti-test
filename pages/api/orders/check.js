import main from "../../../database/conn";
import Order from "../../../model/orderSchema";

const getOrder = async (req, res) => {
  // Connect to database
  await main().catch((err) => console.error(err));
  try {
    // get the order ID from the query parameter
    const { order_id } = req.query;

    // find the order by ID and populate related documents
    const order = await Order.findById(order_id)
      .populate("shipping_address")
      .populate({ path: "user_id", select: "fullname email mobile" })
      .populate("coupon")
      .populate("transaction_id");

    // if order is found, send it in the response
    if (order) {
      res.status(200).json(order);
    } else {
      // if order is not found, send error message
      res.status(400).json({ message: "Order not found" });
    }
  } catch (error) {
    // if there is an error, send error message
    res.status(500).json({ error: `Something went wrong: ${error}` });
  }
};

export default getOrder;

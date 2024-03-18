import main from "../../../../database/conn";
import Order from "../../../../model/orderSchema";

const getOrder = async (req, res) => {
  // Connect to database
  await main().catch((err) => console.error(err));
  try {
    const { user_id } = req.query;
    const orders = await Order.find({ user_id }).sort({ updatedAt: -1 });
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(400).json({ mesage: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default getOrder;

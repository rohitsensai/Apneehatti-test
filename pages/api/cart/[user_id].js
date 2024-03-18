import main from "../../../database/conn";
import Cart from "../../../model/cartSchema";

const userCart = async (req, res) => {
  try {
    await main().catch((err) => console.error(err));
    const { user_id } = req.query;
    const cart = await Cart.findOne({ user_id });
    res.status(200).json(cart);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ error: "Internal server error" });
  }
};

export default userCart;

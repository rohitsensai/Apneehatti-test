import main from "../../../../database/conn";
import Cart from "../../../../model/cartSchema";

const clearCart = async (req, res) => {
  await main().catch((err) => console.error(err));
  try {
    const { user_id } = req.query;
    const deletedCart = await Cart.findOneAndDelete({ user_id });

    if (!deletedCart) {
      res.json({ message: "Cart not found" });
    } else {
      res.json({ message: "Cart cleared" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default clearCart;

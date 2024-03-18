import main from "../../../../database/conn";
import Cart from "../../../../model/cartSchema";
import Product from "../../../../model/productSchema";

const removeItem = async (req, res) => {
  try {
    await main().catch((err) => console.error(err));
    const { user_id } = req.query;
    const { product_id } = req.body;

    let cart = await Cart.findOne({ user_id });
    const existingCartItemIndex = cart.items.findIndex(
      (item) => item.id.toString() === product_id
    );

    if (existingCartItemIndex !== -1) {
      const existingCartItem = cart.items[existingCartItemIndex];
      console.log({ existingCartItem });
      const removeItemTotalPrice =
        existingCartItem.price * existingCartItem.quantity;
      cart.items.splice(existingCartItemIndex, 1);
      cart.subtotal -= Number(removeItemTotalPrice);
      console.log(
        "cart.subtotal ",
        cart.subtotal,
        removeItemTotalPrice,
        existingCartItem
      );
    }

    // Free shipping after 1000 logic
    // if (cart.subtotal > 1000) {
    //   cart.shipping = 0;
    // } else {
    cart.shipping = 50;
    // }

    cart.total = Number(cart.subtotal + cart.shipping);

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ error: "Internal server error" });
  }
};

export default removeItem;

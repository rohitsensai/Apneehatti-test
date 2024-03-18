import main from "../../../../database/conn";
import Cart from "../../../../model/cartSchema";
import Product from "../../../../model/productSchema";

const minusItem = async (req, res) => {
  try {
    await main().catch((err) => console.error(err));
    const { user_id } = req.query;
    const { product_id, quantity } = req.body;

    let cart = await Cart.findOne({ user_id });
    let product = await Product.findOne(
      { _id: product_id },
      {
        name: 1,
        price: 1,
        MRP: 1,
        images: { $slice: 1 },
        alt_text: 1,
        weight: 1,
        SKU: 1,
      }
    );

    const itemTotalPrice = Number(product.price) * Number(quantity);

    product = { ...product.toObject() };
    // Check if the same product is already in the cart
    const existingCartItem = cart.items.find(
      (item) => item.id.toString() == product_id
    );
    console.log({ existingCartItem });
    if (existingCartItem) {
      if (existingCartItem.quantity > 1) {
        existingCartItem.quantity -= quantity;
        existingCartItem.total -= itemTotalPrice;
        cart.subtotal -= itemTotalPrice;
        // Free shipping after 1000 logic
        // if (cart.subtotal > 1000) {
        //   cart.shipping = 0;
        // } else {
        cart.shipping = 0;
        // }
        cart.total = Number(cart.subtotal + cart.shipping);
        await cart.save();
      }
    }
    res.json(cart);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ error: "Internal server error" });
  }
};

export default minusItem;

import main from "../../../../database/conn";
import Cart from "../../../../model/cartSchema";
import Product from "../../../../model/productSchema";

const addItem = async (req, res) => {
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
        images: 1,
        alt_text: 1,
        weight: 1,
        SKU: 1,
      }
    );

    console.log({ product });
    if (!cart) {
      cart = new Cart({
        user_id,
        items: [],
        shipping: Number("0.00"),
        subtotal: Number("0.00"),
        total: Number("0.00"),
      });
    }

    const itemTotalPrice = Number(product.price) * Number(quantity);
    product = { ...product.toObject() };

    const renamed_product = {
      id: product._id,
      title: product.name,
      thumbnail: product.images[0],
      image: product.images,
      alt_text: product.alt_text,
      price: product.price,
      weight: product.weight,
      SKU: product.SKU,
      MRP: product.MRP,
      quantity: quantity,
    };

    // Check if the same product is already in the cart
    const existingCartItem = cart.items.find(
      (item) => item.id.toString() == product_id
    );
    console.log({ existingCartItem });
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      existingCartItem.total += itemTotalPrice;
    } else {
      // const cartItem = {
      //   product,
      //   total: itemTotalPrice,
      // };
      console.log(renamed_product);
      cart.items.push(renamed_product);
    }

    cart.subtotal += itemTotalPrice;

    // Free shipping after 1000 logic
    // if (cart.subtotal > 1000) {
    //   cart.shipping = 0;
    // } else {
    cart.shipping = 0;
    // }

    cart.total = Number(cart.subtotal + cart.shipping);

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ error: "Internal server error" });
  }
};

export default addItem;

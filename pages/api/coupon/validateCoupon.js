import main from "../../../database/conn";
import Coupon from "../../../model/couponSchema";
import Product from "../../../model/productSchema";

import jwt from "jsonwebtoken";

// Connect to database

const validateCoupon = async (req, res) => {
  try {
    await main().catch((err) => console.error(err));
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const token_data = await jwt.verify(token, process.env.JWT_KEY);

    const {
      coupon_code,
      shipping_price,
      order_items,
      order_qty,
      subtotal: subtotalFromClient,
    } = req.body;

    const products = await Product.find(
      { _id: { $in: order_items } },
      { price: 1 }
    );

    console.log({ subtotalFromClient });

    const calculateTotal = (products, order_qty) => {
      return products.reduce((total, product) => {
        const matchingOrderItem = order_qty.find(
          (item) => item.id == product._id
        );
        if (matchingOrderItem) {
          total += product.price * matchingOrderItem.quantity;
        }
        return total;
      }, 0);
    };

    let subtotal = calculateTotal(products, order_qty);

    console.log({ subtotal });
    if (subtotal !== subtotalFromClient) {
      return res
        .status(400)
        .json({ message: "Total mismatch. Please try again." });
    }

    const coupon = await Coupon.findOne({ coupon_code });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    const couponIsValidForUser = !coupon.useby.some(
      (userId) => userId === token_data.id
    );

    const currentDate = new Date();
    const validFrom = new Date(coupon.valid_from);
    const validUntil = new Date(coupon.valid_until);

    if (
      currentDate < validFrom ||
      currentDate > validUntil ||
      !coupon.active ||
      !couponIsValidForUser
    ) {
      return res.status(400).json({ message: "Coupon is not valid" });
    }

    let discounted_price;
    let discount_value;

    if (coupon.discount_percent > 0) {
      discount_value = Math.floor((subtotal * coupon.discount_percent) / 100);
      discounted_price = Math.floor(subtotal - discount_value);
    } else {
      discount_value = Math.floor(coupon.flat_discount);
      discounted_price = Math.floor(subtotal - discount_value);
    }
    console.log({ subtotal, discounted_price, shipping_price });
    return res.status(200).json({
      _id: coupon._id,
      discounted_price: Math.floor(discounted_price + shipping_price),
      discount: Math.floor(discount_value),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default validateCoupon;

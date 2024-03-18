import main from "../../../database/conn";
import User from "../../../model/userSchema";
import jwt from "jsonwebtoken";
import Order from "../../../model/orderSchema";

const createReview = async (req, res) => {
  try {
    // Connect to database
    await main().catch((err) => console.error(err));
    // Get the token from the request header and verify it
    const token = req.headers.authorization.split(" ")[1];
    const token_data = await jwt.verify(token, process.env.JWT_KEY);

    // Extract the review, rating, and product ID from the request body
    const { review, rating, product_id } = req.body;

    // Check if user is authorized before proceeding
    if (token_data) {
      const user = await User.findById(token_data.id);
      // Check if user has purchased the specified product before creating a review
      const isOrderedProduct = await Order.findOne({
        user_id: token_data.id,
        order_items: {
          $elemMatch: { id: product_id },
        },
      });

      res.status(401).json({
        message: "You must purchase the product before submitting a review.",
      });
      // }
    } else {
      res.status(401).json({ message: "Access Denied" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default createReview;

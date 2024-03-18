import main from "../../../database/conn";
import User from "../../../model/userSchema";
import jwt from "jsonwebtoken";
import Product from "../../../model/productSchema";

const wishlist = async (req, res) => {
  // Connect to database
  await main().catch((err) => console.error(err));
  // Get token from header
  const token = req.headers.authorization.split(" ")[1];

  // Verify token
  const token_data = await jwt.verify(token, process.env.JWT_KEY);

  // If token is valid
  if (token_data.id) {
    // Find user's wishlist by ID
    const wishlist = await User.findById(
      { _id: token_data.id },
      { wishlist: 1 }
    );

    // Get IDs of products in the wishlist
    const wishlistProductId = wishlist.wishlist.map((x) => x._id);

    // Find products with IDs in the wishlist
    const wishlistProducts = await Product.find({
      _id: { $in: wishlistProductId },
    });

    // Send response with wishlist products
    res.status(201).json(wishlistProducts);
  } else {
    // If token is invalid, send error response
    res.status(401).json({ message: "Token Expire" });
  }
};

export default wishlist;

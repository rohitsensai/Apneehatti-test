import main from "../../../../database/conn";
import User from "../../../../model/userSchema";
import Product from "../../../../model/productSchema";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const removeFromWishlist = async (req, res) => {
  // Connect to database
  await main().catch((err) => console.error(err));
  // Get the token from the authorization header
  const token = req.headers.authorization.split(" ")[1];

  // Verify the token and get the user ID from the decoded data
  const token_data = await jwt.verify(token, process.env.JWT_KEY);

  // Get the ID of the product to be removed from the wishlist from the request body
  const { id } = req.body;

  // Check if the user ID is present in the decoded token data
  if (token_data.id) {
    // Remove the product ID from the wishlist array of the user with the given ID
    const wishlist = await User.updateOne(
      { _id: token_data.id },
      { $pull: { wishlist: mongoose.Types.ObjectId(id) } }
    );

    // Get the updated wishlist array of the user with the given ID
    const wishlistProductId = await User.findById(
      { _id: token_data.id },
      {
        wishlist: 1,
      }
    );

    // Get the products with the IDs in the wishlist array
    const wishlistProducts = await Product.find({
      _id: { $in: wishlistProductId.wishlist },
    });

    // Send the list of products in the wishlist as response
    res.status(201).json(wishlistProducts);
  } else {
    // Send error response if the token is invalid or expired
    res.status(401).json({ message: "Token Expire" });
  }
};

export default removeFromWishlist;

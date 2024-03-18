import main from "../../../../database/conn";
import User from "../../../../model/userSchema";
import jwt from "jsonwebtoken";

// This function adds a product to a user's wishlist

const addToWishlist = async (req, res) => {
  // Connect to database
  await main().catch((err) => console.error(err));
  // Extract the token from the request headers and verify it
  const token = req.headers.authorization.split(" ")[1];
  const token_data = await jwt.verify(token, process.env.JWT_KEY);

  // Extract the product ID from the request body
  const { id } = req.body;

  // Check if the token is valid
  if (token_data.id) {
    // Add the product ID to the user's wishlist and update the user document
    const wishlist = await User.updateOne(
      { _id: token_data.id },
      { $push: { wishlist: id } }
    );
    res.status(201).json({ message: "Added to wishlist" });
  } else {
    // If the token is not valid, send an error response
    res.status(401).json({ error: "Token Expire" });
  }
};

export default addToWishlist;

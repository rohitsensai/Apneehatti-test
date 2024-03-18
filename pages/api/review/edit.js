import main from "../../../database/conn";
import calculateAverageRating from "../../../helper/calculateAverageRating";
import Review from "../../../model/reviewSchema";
import jwt from "jsonwebtoken";
import Product from "../../../model/productSchema";

const editReview = async (req, res) => {
  try {
    // Connect to database
    await main().catch((err) => console.error(err));
    const token = req.headers.authorization.split(" ")[1];
    const token_data = await jwt.verify(token, process.env.JWT_KEY);

    // Check if user is authorized before proceeding
    if (token_data) {
      // Update the specified review object
      const updatedReview = await Review.updateOne(
        { _id: req.body.id },
        req.body
      );

      // Find all reviews for the specified product
      const reviews = await Review.find({ product_id: req.body.product_id });

      // Calculate the new average rating and update the product object
      const rating = calculateAverageRating(reviews);
      const updatedProduct = await Product.findByIdAndUpdate(
        req.body.product_id,
        { $set: { rating } },
        { new: true }
      );
      // Return the updated list of reviews
      res.status(200).json(reviews);
    } else {
      res.status(401).json({ message: "Access Denied" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default editReview;

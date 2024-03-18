import main from "../../../../database/conn";
import Review from "../../../../model/reviewSchema";

const getReviewById = async (req, res) => {
  try {
    // Connect to database
    await main().catch((err) => console.error(err));
    const { product_id } = req.query;
    const review = await Review.find({ product_id: product_id });
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(400).json({ mesage: "review not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default getReviewById;

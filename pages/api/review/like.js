import main from "../../../database/conn";
import Review from "../../../model/reviewSchema";
import jwt from "jsonwebtoken";

const UpdateReviewLike = async (req, res) => {
  // Connect to database
  await main().catch((err) => console.error(err));
  const token = req.headers.authorization.split(" ")[1];
  const token_data = await jwt.verify(token, process.env.JWT_KEY);
  const { id, like, product_id } = req.body;
  if (token_data) {
    const review = await Review.findById({ _id: req.body.id });

    if (
      review.like_by_users.length > 0 &&
      review.like_by_users.filter((user) =>
        user == token_data.id ? true : false
      )
    ) {
      if (like) {
        return res.status(200).json("already liked");
      } else {
        const update = await Review.updateOne(
          { _id: req.body.id },
          {
            number_of_likes: review.number_of_likes - 1,
            number_of_dislikes: review.number_of_dislikes + 1,
            $pull: { like_by_users: token_data.id },
            $push: { dislike_by_users: token_data.id },
          }
        );
      }
    } else if (
      review.dislike_by_users.length > 0 &&
      review.dislike_by_users.filter((user) =>
        user == token_data.id ? true : false
      )
    ) {
      if (!like) {
        return res.status(200).json("already disliked");
      } else {
        const update = await Review.updateOne(
          { _id: req.body.id },
          {
            number_of_likes: review.number_of_likes + 1,
            number_of_dislikes: review.number_of_dislikes - 1,
            $push: { like_by_users: token_data.id },
            $pull: { dislike_by_users: token_data.id },
          }
        );
      }
    } else if (like) {
      const update = await Review.updateOne(
        { _id: req.body.id },
        {
          $inc: { number_of_likes: 1 },
          $push: { like_by_users: token_data.id },
        }
      );
    } else {
      const update = await Review.updateOne(
        { _id: req.body.id },
        {
          $inc: { number_of_dislikes: 1 },
          $push: { dislike_by_users: token_data.id },
        }
      );
    }

    const updatedReview = await Review.find({ product_id: product_id });
    res.status(200).json(updatedReview);
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
};

export default UpdateReviewLike;

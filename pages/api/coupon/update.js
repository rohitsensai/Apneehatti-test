import main from "../../../database/conn";
import Coupon from "../../../model/couponSchema";
import jwt from "jsonwebtoken";

const update = async (req, res) => {
  // Connect to database
  await main().catch((err) => console.error(err));
  const token = req.headers.authorization.split(" ")[1];
  const token_data = await jwt.verify(token, process.env.JWT_KEY); // Verify user token

  const { id } = req.body;

  if (token_data.id) {
    // Check if user id is present in token
    const coupon = await Coupon.updateOne(
      { _id: id },
      { $push: { useby: token_data.id } } // Update the coupon with user id
    );
    res.status(201).json(coupon); // Return success response
  } else {
    res.status(401).json({ message: "Token Expire" }); // Return unauthorized response if user id is not present in token
  }
};

export default update;

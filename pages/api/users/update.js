import main from "../../../database/conn";
import User from "../../../model/userSchema";
import jwt from "jsonwebtoken";

const update = async (req, res) => {
  try {
    await main(); // Connect to database
    const token = req.headers.authorization.split(" ")[1];
    const token_data = jwt.verify(token, process.env.JWT_KEY); // Verify user token

    if (token_data.id) {
      // Check if user id is present in token
      const updatedUser = await User.updateOne(
        { _id: token_data.id },
        req.body
      );
      res.status(201).json(updatedUser); // Return success response
    } else {
      res.status(401).json({ message: "Token Expired" }); // Return unauthorized response if user id is not present in token
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" }); // Return generic error response for any unexpected errors
  }
};

export default update;

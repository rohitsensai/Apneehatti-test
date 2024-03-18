import main from "../../../../database/conn";
import User from "../../../../model/userSchema";

const getUserById = async (req, res) => {
  try {
    // Connect to database
    await main().catch((err) => console.error(err));
    // Get the user ID from the request query
    const { user_id } = req.query;

    // Find a user by ID, selecting only their full name
    const user = await User.findById(
      { _id: user_id },
      { fullname: 1, email: 1, mobile: 1 }
    );

    // If a user is found, return it with a 200 status code
    if (user) {
      res.status(200).json(user);
    } else {
      // If a user is not found, return an error message with a 400 status code
      res.status(400).json({ mesage: "user not found" });
    }
  } catch (error) {
    // If an error occurs, return the error message with a 500 status code
    res.status(500).json({ error });
  }
};

export default getUserById;

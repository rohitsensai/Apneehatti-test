import main from "../../../database/conn";
import User from "../../../model/userSchema";

const getUsers = async (req, res) => {
  try {
    // Connect to database
    await main().catch((err) => console.error(err));
    // Retrieve all users from the database
    const userList = await User.find({});

    // If users are found, return them as JSON
    if (userList) {
      return res.status(200).json(userList);
    }
    // Otherwise, return an error message
    else {
      return res.status(500).json("User not found");
    }
  } catch (error) {
    // Return an error response if an exception occurs
    return res.status(500).json({ error });
  }
};

export default getUsers;

import main from "../../../database/conn";
import User from "../../../model/userSchema";
import jwt from "jsonwebtoken";

const resetPassword = async (req, res) => {
  try {
    // Connect to database
    await main().catch((err) => console.error(err));
    const { password, token } = req.body;

    const isValidToken = jwt.verify(token, process.env.JWT_KEY);
    if (!isValidToken) {
      return res.status(401).json({ error: "Token expire" });
    }

    const user = await User.findOne({ _id: isValidToken.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = password;
    await user.save();
    res.status(200).json({ message: "Password successfully changed" });
  } catch (error) {
    // Send a response with a status code of 404 and an error message as the body if there is an error
    res.status(404).json({ error: "Not Found" });
  }
};

// Export the resetPassword function as the default export of the module
export default resetPassword;

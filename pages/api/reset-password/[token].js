import main from "../../../database/conn";
import jwt from "jsonwebtoken";

const resetPassword = async (req, res) => {
  try {
    // Connect to database
    await main().catch((err) => console.error(err));
    const { token } = req.body;
    const isValidToken = jwt.verify(token, process.env.JWT_KEY);
    if (!isValidToken) {
      return res.status(401).json({ error: "Token expire" });
    }
    res.status(200).json({ message: "Token verfied" });
  } catch (error) {
    // Send a response with a status code of 404 and an error message as the body if there is an error
    res.status(404).json({ error: "Not Found" });
  }
};

// Export the resetPassword function as the default export of the module
export default resetPassword;

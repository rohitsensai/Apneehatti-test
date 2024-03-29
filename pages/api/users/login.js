import main from "../../../database/conn";
import User from "../../../model/userSchema";
import generateToken from "../../../utils/generateToken";

// Handler function for login route
const login = async (req, res) => {
  console.log("inside login.js")
  const { email, password } = req.body;
  // Connect to database
  await main().catch((err) => console.error(err));

  // Check if user exists in database and if password matches
  const userExist = await User.findOne({ email });
  if (userExist && (await userExist.matchPassword(password))) {
    // Create user object with relevant information and generate JWT token
    const user = {
      _id: userExist._id,
      fullname: userExist.fullname,
      email: userExist.email,
      isAdmin: userExist.isAdmin,
      token: generateToken(userExist._id, userExist.isAdmin),
    };

    // Send user object with status code 200
    res.status(200).json(user);
  } else {
    // Send error message with status code 404
    res.status(404).json({ error: "Login credentials incorrect" });
  }
};

export default login;

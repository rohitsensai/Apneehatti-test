import main from "../../../database/conn";
import User from "../../../model/userSchema";
import generateToken from "../../../utils/generateToken";

// Handler function for creating a user
const createUser = async (req, res) => {
  // Connect to database
  await main().catch((err) => console.error(err));
  const { fullname, email, mobile, password } = req.body;

  // Check if email or mobile number already exists in database
  if (await User.findOne({ email })) {
    res.status(409).json({ error: "Email already exists" });
  } else if (await User.findOne({ mobile })) {
    res.status(409).json({ error: "Mobile number already exists" });
  } else {
    // Create new user in database and return relevant information along with generated JWT token
    const user = await User.create({ fullname, email, mobile, password });
    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      mobile: user.mobile,
      // password: user.password, // Note: password should not be returned in response
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin),
    });
  }
};

export default createUser;

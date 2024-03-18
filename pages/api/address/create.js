import main from "../../../database/conn";
import Address from "../../../model/userAddressSchema";

// Connect to database
const Create = async (req, res) => {
  await main().catch((err) => console.error(err));

  try {
    // Destructure request body
    const {
      user_id,
      address_line,
      city,
      postal_code,
      country,
      state,
      mobile,
      email,
      fullname,
    } = await JSON.parse(req.body);

    // Create new address object from request body
    const addressObj = {
      user_id,
      email,
      address_line,
      city,
      postal_code,
      country,
      state,
      mobile,
      fullname,
    };

    // Save new address to database
    const address = await Address(addressObj).save();
    res.status(201).json({ shipping_address: address._id });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default Create;

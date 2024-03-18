import main from "../../../../database/conn";
import Address from "../../../../model/userAddressSchema";
// Connect to the database
main().catch((err) => console.error(err));

const getUserAddress = async (req, res) => {
  try {
    // Get the user ID from the query parameters
    const { user_id } = req.query;

    // Find all addresses associated with the user ID
    const addresses = await Address.find({ user_id });

    if (addresses.length) {
      // Return the addresses if found
      res
        .status(200)
        .json(
          Array.isArray(addresses)
            ? addresses.filter((address) => address.enable === true)
            : []
        );
    } else {
      // Return an error message if no addresses found
      res.status(400).json({ message: "No addresses found" });
    }
  } catch (error) {
    // Return an error message if there's an issue with the request
    res.status(500).json({ error });
  }
};

export default getUserAddress;

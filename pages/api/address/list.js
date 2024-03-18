import main from "../../../database/conn";
import Address from "../../../model/userAddressSchema";

const getAddress = async (req, res) => {
  // Connect to database
  await main().catch((err) => console.error(err));
  try {
    // Find all addresses in the database
    const addressList = await Address.find({});

    // Return the address list
    return res
      .status(200)
      .json(
        Array.isArray(addressList)
          ? addressList.filter((address) => address.enable === true)
          : []
      );
  } catch (error) {
    // Return error message if any errors occur
    return res.status(500).json({ error: "Error retrieving addresses" });
  }
};

export default getAddress;

import main from "../../../database/conn";
import Address from "../../../model/userAddressSchema";

// Get address by ID

const getAddress = async (req, res) => {
  await main().catch((err) => console.error(err));
  try {
    const { address_id } = req.query;

    // Find the address by ID
    const foundAddress = await Address.findById(address_id);

    // If the address is found, return it
    if (foundAddress) {
      res.status(200).json(foundAddress);
    } else {
      res.status(400).json({ message: "Address not found" });
    }
  } catch (error) {
    // Handle any errors that might occur
    res.status(500).json({ error });
  }
};

export default getAddress;

import main from "../../../../database/conn";
import Address from "../../../../model/userAddressSchema";

// Function to delete user's address

const deleteAddress = async (req, res) => {
  try {
    await main().catch((err) => console.error(err)); // Connect to database

    const { address_id } = req.query; // Get address id from request
    const address = await Address.deleteOne({ _id: address_id }); // Delete address from database
    if (address) {
      res.status(200).json(address); // Return success response if address was found and deleted
    } else {
      res.status(400).json({ message: "Address not found" }); // Return error response if address was not found
    }
  } catch (error) {
    res.status(500).json({ error }); // Return error response if an unexpected error occurred
  }
};

export default deleteAddress;

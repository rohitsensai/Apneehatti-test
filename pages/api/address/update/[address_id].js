import main from "../../../../database/conn";
import Address from "../../../../model/userAddressSchema";

const getAddress = async (req, res) => {
  try {
    await main().catch((err) => console.error(err));

    const { address_id } = req.query;

    // Update the address with the new data from the request body
    await Address.findByIdAndUpdate(address_id, req.body);

    // Find the updated address list for the user
    const updatedAddresses = await Address.find({
      user_id: req.body.user_id,
    }).lean();

    res
      .status(200)
      .json(
        Array.isArray(updatedAddresses)
          ? updatedAddresses.filter((address) => address.enable === true)
          : []
      );
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getAddress;

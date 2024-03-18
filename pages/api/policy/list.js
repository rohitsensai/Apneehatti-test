import main from "../../../database/conn";
import Policy from "../../../model/policySchema";

const GetAll = async (req, res) => {
  try {
    // Connect to database
    await main().catch((err) => console.error(err));
    const policies = await Policy.find({}).populate("product_category");
    return res.status(200).json(policies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

export default GetAll;

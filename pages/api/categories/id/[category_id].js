import main from "../../../../database/conn";
import Category from "../../../../model/categorySchema";

const getCategoryById = async (req, res) => {
  // Connect to database
  await main().catch((err) => console.error(err));
  try {
    // get the category ID from the request query
    const { category_id } = req.query;
    // search for the category in the database by its ID
    const category = await Category.findById({ _id: category_id });
    if (category) {
      // return the category object if found
      res.status(200).json(category);
    } else {
      // return an error message if the category is not found
      res.status(400).json({ message: "Category not found" });
    }
  } catch (error) {
    // return a server error message if an error occurs
    res.status(500).json({ error });
  }
};

export default getCategoryById;

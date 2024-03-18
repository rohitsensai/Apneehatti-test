
import main from "../../../database/conn";
import Category from "../../../model/categorySchema";

const list = async (req, res) => {
  try {
    await main();
    const categories = await Category.find({});

    const getCategories = (category_data = [], parent_id = null) => {
      const categoriesList = [];
      let category;

      if (category_data.length > 0) {
        if (parent_id == null) {
          category = category_data.filter(
            (item) => item.parent_id == undefined
          );
        } else {
          category = category_data.filter(
            (item) => item.parent_id == parent_id
          );
        }

        for (let cat of category) {
          categoriesList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: getCategories(category_data, cat._id),
            active: cat.active,
          });
        }

        return categoriesList;
      } else {
        // Send an error response and exit the function
        return res.status(400).json({ message: "categories not found" });
      }
    };

    // Call getCategories with all categories and send as response
    res.status(200).json(getCategories(categories));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default list;

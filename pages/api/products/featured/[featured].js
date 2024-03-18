import main from "../../../../database/conn";
import Product from "../../../../model/productSchema";

const getProducts = async (req, res) => {
  try {
    // Connect to database
    await main().catch((err) => console.error(err));
    const { featured } = req.query;
    const products = await Product.find({
      featured: featured,
      active: true,
    })
      .sort({ updatedAt: -1 })
      .limit(10)
      .populate({
        path: "category_id",
        select: "_id name active",
      })
      .populate({
        path: "brand_id",
        select: "_id name slug",
      });
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(400).json({ mesage: "Products not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default getProducts;

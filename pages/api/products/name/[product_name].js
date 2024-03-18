import main from "../../../../database/conn";
import Product from "../../../../model/productSchema";
// import { useParams } from "react-router-dom";

const getSearchProduct = async (req, res) => {
  try {
    // Connect to database
    await main().catch((err) => console.error(err));
    const { product_name } = req.query;
    if (!product_name || typeof product_name !== "string") {
      return res.status(400).json({ message: "Invalid product name" });
    }

    const products = await Product.find({ active: true });
    const searchProducts = products.filter((product) =>
      product.name?.toLowerCase().includes(product_name.toLowerCase())
    );

    if (searchProducts.length > 0) {
      const populatedProducts = await Product.populate(searchProducts, [
        {
          path: "category_id",
          select: "_id name active",
        },
        {
          path: "brand_id",
          select: "_id name slug",
        },
      ]);

      return res.status(200).json(populatedProducts);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getSearchProduct;

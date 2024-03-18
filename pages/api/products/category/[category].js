import main from "../../../../database/conn";
import Product from "../../../../model/productSchema";
import Category from "../../../../model/categorySchema";
import mongoose from "mongoose";
// import { useParams } from "react-router-dom";

const getProduct = async (req, res) => {
  try {
    // Connect to database
    await main().catch((err) => console.error(err));
    const { category } = req.query;
    const category_by_slug = await Category.findOne({ slug: category }).lean();
    const category_id = category_by_slug._id;

    // const getCategories = async (id) => {
    //   const array_of_ids = [id.toString()];

    //   let parent_id = id;
    //   while (parent_id) {
    //     const child = await Category.findOne({ parent_id }).lean();
    //     parent_id = child ? child._id : null;
    //     if (parent_id) {
    //       array_of_ids.push(parent_id.toString());
    //     }
    //   }

    //   return array_of_ids;
    // };

    // const array_of_ids = await getCategories(category_id);

    const product = await Product.aggregate([
      {
        $match: {
          category_id: { $in: [category_id] },
          active: true,
        },
      },
      {
        $group: {
          _id: "$category_id",
          product: { $addToSet: "$$ROOT" },
        },
      },
    ]);

    const populatedProduct = await Product.populate(product[0].product, {
      path: "category_id",
      select: "_id active name",
    });

    if (populatedProduct) {
      res.status(200).json(populatedProduct);
    } else {
      res.status(400).json([]);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default getProduct;

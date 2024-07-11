import { models, model, Schema } from "mongoose";
import Category from "./categorySchema";
import Brand from "./brandSchema";
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    main_image:{
      type: String,
      default: null,
    },
    alt_text: {
      type: String,
      default: "Product_image",
    },
    price: {
      type: Number,
      required: true,
    },
    MRP: {
      type: Number,
      required: true,
    },
    discount_id: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    SKU: {
      type: String,
      required: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
    brand_id: {
      type: Schema.Types.ObjectId,
      ref: Brand,
      required: true,
    },
    featured: {
      type: String,
      default: "new_arrival",
    },
    out_of_stock: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = models.Product || model("Product", productSchema);

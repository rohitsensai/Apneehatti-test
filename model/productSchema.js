import { models, model, Schema } from "mongoose";
import Category from "../model/categorySchema";
import Brand from "../model/brandSchema";

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
    weight: {
      type: Number,
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
productSchema.index({ name: "text" });
module.exports = models.Product || model("Product", productSchema);

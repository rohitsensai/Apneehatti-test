import { models, model, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    user_id: { type: String, required: true },
    items: [
      {
        id: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        thumbnail: {
          type: String,
          required: true,
        },
        SKU: {
          type: String,
          required: true,
        },
        image: [
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
        quantity: {
          type: Number,
          required: true,
        },
        weight: {
          type: Number,
          required: true,
        },
      },
    ],
    shipping: { type: Number, default: 0 },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = models.Cart || model("Cart", cartSchema);

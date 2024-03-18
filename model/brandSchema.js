import { models, model, Schema } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: String,
    },
    email: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = models.Brand || model("Brand", brandSchema);

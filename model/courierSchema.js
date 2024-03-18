import { models, model, Schema } from "mongoose";

const courierSchema = new Schema(
  {
    company_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = models.Courier || model("Courier", courierSchema);

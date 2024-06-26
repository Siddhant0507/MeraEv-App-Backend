import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    serviceType: {
      type: String,
      required: true,
    },
    bikename: {
      type: String,
      required: true,
    },
    dateOfService: {
      type: String,
      required: true,
    },
    cost: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;

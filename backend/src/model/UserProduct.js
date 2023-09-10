import mongoose, { Schema, model } from "mongoose";

const UserProductSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "It must be required"],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "It must be required"],
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const ProductModel = model("UserProduct", UserProductSchema);

export default ProductModel;

import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    rating: {
      rate: {
        type: String,
        default: 0,
      },
      count: {
        type: String,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

const Products = model("Products", ProductSchema);

export default Products;

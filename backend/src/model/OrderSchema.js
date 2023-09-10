import mongoose, { Schema, model, mongo } from "mongoose";

const OrderSchema = new Schema({
  userId: {
    type: String,
    required: [true, "User id must be required"],
  },
  orderId: {
    type: String,
    required: [true, "Order id must be required"],
  },
  fname: {
    type: String,
    required: [true, "Fname must be required"],
  },
  lname: {
    type: String,
    required: [true, "Lname must be required"],
  },
  email: {
    type: String,
    required: [true, "Email must be required"],
  },
  state: {
    type: String,
    required: [true, "State must be required"],
  },
  address: {
    type: String,
    required: [true, "Address must be required"],
  },
  pin: {
    type: Number,
    required: [true, "Pin must be required"],
  },
  totalPayment: {
    type: Number,
    required: [true, "TotalPayment must be required"],
  },
  products: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      userId: String,
      productId: String,
      quantity: Number,
      status: {
        type: String,
        enum: ["Pending", "Arraving", "Delivered"],
        default: "Pending",
      },
    },
  ],
});

const OrderModel = new model("Orders", OrderSchema);

export default OrderModel;

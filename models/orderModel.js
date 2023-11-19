import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      required: true,
    },
    productList: [
      {
        product_id: {
          type: ObjectId,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
    },
    order_status: {
      type: String,
      required: true,
    },
    payment: {
      method: String,
    },
    shippingAddress: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

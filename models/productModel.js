import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const productSchema = mongoose.Schema(
  {
    productname: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productprice: {
      type: Number,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    productImages: [
      {
        type: String,
        required: true,
        data: Buffer,
      },
    ],
    productReviews: [
      {
        type: ObjectId,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

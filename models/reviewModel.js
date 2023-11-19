import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const reviewSchema = mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      required: true,
    },
    product_id: {
      type: ObjectId,
      required: true,
    },
    product_rating: {
      type: Number,
      required: true,
    },
    reviewDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;

import asyncHandler from "express-async-handler";
import Review from "../models/reviewModel.js";

const createReview = asyncHandler(async (req, res) => {
  const { user_id, product_id, product_rating, reviewDescription } = req.body;

  const review = await Review.create({
    user_id,
    product_id,
    product_rating,
    reviewDescription,
  });
  if (review) {
    const createdreview = await Review.save();

    res.status(201).json({
      message: "review created successfully",
      createdreview: createdreview,
    });
  } else {
    res.status(400);
    throw new Error("Error while creating review");
  }
});

export { createReview };

import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import {
  createOrder,
  cancelOrder,
  updateOrder,
} from "../controllers/orderController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { createReview } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Review Route

router.post("/createreview", protect, createReview);

// Order Routes
router.post("/createorder", protect, createOrder);
router.post("/cancelorder", protect, cancelOrder);
router.put("/updateorder", protect, updateOrder);

export default router;

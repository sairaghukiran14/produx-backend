import express from "express";
import {
  addProduct,
  updateProduct,
  removeProduct,
} from "../controllers/productController.js";
import { protectAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/addproduct", protectAdmin, addProduct);
router.put("/updateproduct", protectAdmin, updateProduct);
router.post("/removeproduct", protectAdmin, removeProduct);

export default router;

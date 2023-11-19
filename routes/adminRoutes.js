import express from "express";
import {
  authAdmin,
  logoutAdmin,
  getAdminProfile,
  registerAdmin,
} from "../controllers/adminController.js";
import { protectAdmin } from "../middlewares/adminMiddleware.js";

const Adminrouter = express.Router();

Adminrouter.post("/auth", authAdmin);
Adminrouter.post("/register", registerAdmin);
Adminrouter.post("/logout", logoutAdmin);
Adminrouter.route("/profile").get(protectAdmin, getAdminProfile);

export default Adminrouter;

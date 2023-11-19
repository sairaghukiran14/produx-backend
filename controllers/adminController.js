import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import generateToken from "../utilities/generateToken.js";

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    generateToken(res, admin._id);

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Admin email or password");
  }
});

const logoutAdmin = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Admin Logged out successfully" });
};

const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const AdminExists = await Admin.findOne({ email });

  if (AdminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const admin = await Admin.create({
    name,
    email,
    password,
  });

  if (admin) {
    generateToken(res, admin._id);

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Admin data");
  }
});

export { authAdmin, logoutAdmin, getAdminProfile, registerAdmin };

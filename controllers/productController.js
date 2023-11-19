import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
// import generateToken from "../utilities/generateToken.js";

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const product = await Product.deleteOne({ _id: id });

  if (product) {
    res.json({
      _id: id,
      message: "Product deleted successfully",
    });
  } else {
    res.status(401);
    throw new Error("Problem occured while deleting product");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, quantity, images, reviews } =
    req.body;
  const product = await Product.findById(req.product._id);
  //   const AdminExists = await Admin.findOne({ email });

  //   if (AdminExists) {
  //     res.status(400);
  //     throw new Error("Admin already exists");
  //   }

  if (product) {
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.quantity = req.body.quantity || product.quantity;

    const updatedProduct = await product.save();

    res.status(201).json({
      message: "Product Updated successfully",
      _id: updatedProduct._id,
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      category: updatedProduct.category,
      quantity: updatedProduct.quantity,
      images: updatedProduct.images,
    });
  } else {
    res.status(400);
    throw new Error("Product cant be Updated");
  }
});

// const getAdminProfile = asyncHandler(async (req, res) => {
//   const admin = await Admin.findById(req.admin._id);

//   if (admin) {
//     res.json({
//       _id: admin._id,
//       name: admin.name,
//       email: admin.email,
//     });
//   } else {
//     res.status(404);
//     throw new Error("Admin not found");
//   }
// });
const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, quantity, images, reviews } =
    req.body;

  //   const AdminExists = await Admin.findOne({ email });

  //   if (AdminExists) {
  //     res.status(400);
  //     throw new Error("Admin already exists");
  //   }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    quantity,
    images,
    reviews,
  });

  if (product) {
    res.status(201).json({
      message: "Product created successfully",
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      quantity: product.quantity,
      images: product.images,
      reviews: product.reviews,
    });
  } else {
    res.status(400);
    throw new Error("Product cant be created");
  }
});

export { authAdmin, logoutAdmin, getAdminProfile, registerAdmin };

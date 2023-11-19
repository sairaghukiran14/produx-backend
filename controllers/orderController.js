import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

const createOrder = asyncHandler(async (req, res) => {
  const {
    user_id,
    productList,
    totalAmount,
    order_status,
    payment,
    shippingAddress,
  } = req.body;
  //   const orderCheck = await Order.findById(req.order._id);

  const order = await Order.create({
    user_id,
    productList,
    totalAmount,
    order_status,
    payment,
    shippingAddress,
  });
  if (order) {
    const createdOrder = await order.save();

    res.status(201).json({
      message: "order created successfully",
      createOrder: createdOrder,
    });
  } else {
    res.status(400);
    throw new Error("Error while creating order");
  }
});

const cancelOrder = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const order = await Order.deleteOne({ _id: id });

  if (order) {
    res.json({
      _id: id,
      message: "Order cancelled successfully",
    });
  } else {
    res.status(401);
    throw new Error("Problem occured while cancelling Order");
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  const {
    user_id,
    productList,
    totalAmount,
    order_status,
    payment,
    shippingAddress,
  } = req.body;
  const order = await Order.findById(req.order._id);
  if (order) {
    order.shippingAddress.street = req.body.shippingAddress.street || order.shippingAddress.street;
     order.shippingAddress.city =
       req.body.shippingAddress.city || order.shippingAddress.city;
        order.shippingAddress.state =
          req.body.shippingAddress.state || order.shippingAddress.state;
           order.shippingAddress.country =
             req.body.shippingAddress.country || order.shippingAddress.country;
              order.shippingAddress.zipcode =
                req.body.shippingAddress.zipcode || order.shippingAddress.zipcode;
    const updatedorder = await order.save();

    res.status(201).json({
      message: "Order Updated successfully",
      updatedorder: updatedorder,
    });
  } else {
    res.status(400);
    throw new Error("Order cant be Updated");
  }
});

export { createOrder, cancelOrder, updateOrder };

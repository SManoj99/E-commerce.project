import express from "express";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkout", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
  if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart empty" });
  const total = cart.items.reduce((s, it) => s + (it.product.price * it.qty), 0);
  const order = new Order({ user: req.user.id, products: cart.items, amount: total });
  await order.save();
  await Cart.deleteOne({ user: req.user.id });
  res.json({ message: "Order placed", order });
});

export default router;

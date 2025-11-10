import express from "express";
import Cart from "../models/cartModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, async (req, res) => {
  const { product, qty } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = new Cart({ user: req.user.id, items: [] });
  cart.items.push({ product, qty: qty || 1 });
  await cart.save();
  res.json(cart);
});

router.post("/remove", protect, async (req, res) => {
  const { product } = req.body;
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.json({ message: "Empty" });
  cart.items = cart.items.filter(i => i.product.toString() !== product);
  await cart.save();
  res.json(cart);
});

export default router;

import express from "express";
import Product from "../models/productModel.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const list = await Product.find();
  res.json(list);
});

router.post("/", protect, adminOnly, async (req, res) => {
  const p = new Product(req.body);
  await p.save();
  res.json(p);
});

router.put("/:id", protect, adminOnly, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;

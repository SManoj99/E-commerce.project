import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { SECRET_KEY } from "../config.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 9);
    const u = new User({ username, email, password: hashed });
    await u.save();
    res.json({ message: "Registered" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if (!u) return res.status(404).json({ message: "User not found" });
    const ok = await bcrypt.compare(password, u.password);
    if (!ok) return res.status(401).json({ message: "Wrong password" });
    const token = jwt.sign({ id: u._id, role: u.role }, SECRET_KEY);
    res.json({ token, role: u.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

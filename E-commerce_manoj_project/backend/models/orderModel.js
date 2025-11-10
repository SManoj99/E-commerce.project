import mongoose from "mongoose";
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      qty: Number
    }
  ],
  amount: Number,
  orderedAt: { type: Date, default: Date.now }
});
export default mongoose.model("Order", schema);

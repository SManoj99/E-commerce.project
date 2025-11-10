import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  stock: Number
});
export default mongoose.model("Product", schema);

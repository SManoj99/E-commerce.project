import mongoose from "mongoose";
const schema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String, enum: ["user","admin"], default: "user" }
});
export default mongoose.model("User", schema);

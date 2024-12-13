import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "1d" }, // Expire after 1 day
});

const Blacklist = mongoose.model("Blacklist", blacklistSchema);
export default Blacklist;

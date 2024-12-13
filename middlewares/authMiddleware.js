import jwt from "jsonwebtoken";
import Blacklist from "../models/Blacklist.js";

export const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token after "Bearer"

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });

  try {
    // Check if the token is blacklisted
    const blacklisted = await Blacklist.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    return res.status(400).json({ message: "Invalid token" });
  }
};

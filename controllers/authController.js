import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import Blacklist from "../models/Blacklist.js"; // Assuming you have a Blacklist model

// Register user
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMach = user.comparePassword(password);
    if (!isMach) {
      console.log("Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("JWT token generated:", token);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log("Error during login process:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout user
export const logout = async (req, res) => {
  try {
    // Get token from the Authorization header
    const token = req.header("Authorization")?.split(" ")[1];

    // If there's no token, return an error
    if (!token) return res.status(400).json({ message: "No token provided" });

    // Blacklist the token
    const blacklistToken = new Blacklist({ token });
    await blacklistToken.save();

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

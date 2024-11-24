import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import CreateTokenAndSaveCookie from "../jwt/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password, confirmpassword } = req.body;

    // Validate the input
    if (!fullname || !email || !password || !confirmpassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword, // Only store hashed passwords
    });

    await newUser.save(); // Save the user in the database

    // Generate a token and set it as a cookie
    CreateTokenAndSaveCookie(newUser._id, res);

    // Send a success response
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error);

    // Ensure only one response is sent
    if (!res.headersSent) {
      return res.status(500).json({ message: "Server error" });
    }
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the input
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate a token and set it as a cookie
    CreateTokenAndSaveCookie(user._id, res);

    // Send a success response
    return res.json({
      message: "User logged in successfully",
      // user: { _id: user._id, fullname: user.fullname, email: user.email },
    });
  } catch (error) {
    console.error("Error during login:", error);

    // Ensure only one response is sent
    if (!res.headersSent) {
      return res.status(500).json({ message: "Server error" });
    }
  }
};


// Logout Controller
export const logout = async (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie("jwt");
    return res.json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const loggedInUser = req.user._id; // Assuming user data is in `req.user` after authentication

    // Fetch all users except the logged-in user
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password"); // Exclude the password field

    return res.status(200).json({ users: filteredUsers });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, no token provided" });
    }

    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verified) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const user = await User.findById(verified.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user to the request object
    next();
  } catch (error) {
    console.error("Error in secureRoute middleware:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export default secureRoute;

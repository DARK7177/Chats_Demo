import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "10d", // Token expiration time
  });

  // Set the cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Prevents access to cookie via JavaScript (XSS protection)
    secure: process.env.NODE_ENV === "production", // Set to true only in production for HTTPS
    sameSite: "strict", // Strict protection against CSRF
  });

  // Send a response
  res.status(200).json({ message: "Logged in successfully" });
};

export default createTokenAndSaveCookie;

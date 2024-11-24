import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./route/user.route.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 5001;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log("Mongodb Connected ");
} catch (error) {
  console.log(error);
}

app.use("/api/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

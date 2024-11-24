import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true, // This ensures that the field must be provided.
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
  },
}); // createdAt & updatedAt

const User = mongoose.model("User", userSchema);
export default User;

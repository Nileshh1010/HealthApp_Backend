import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["patient", "doctor"],
    default: "patient",
  },
  specialization: {
    type: String,
    required: function () {
      return this.role === "doctor";
    },
  },
});

export default mongoose.model("User", userSchema);

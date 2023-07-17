import mongoose from "mongoose";

const Admin = mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    nomorHP: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    kantor: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admins", Admin);

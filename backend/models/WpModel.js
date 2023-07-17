import mongoose from "mongoose";

const Wp = mongoose.Schema(
  {
    nama: {
      type: String,
    },
    nomorHP: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
    },
    kantor: {
      type: String,
      required: true,
    },
    kendaraan: [],
  },
  { timestamps: true }
);

export default mongoose.model("WajibPajak", Wp);

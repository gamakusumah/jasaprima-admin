import mongoose from "mongoose";

const Kendaraan = mongoose.Schema(
  {
    noPol: {
      type: String,
      required: true,
    },
    tglPajak: {
      type: String,
    },
    tglSTNK: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Kendaraan", Kendaraan);

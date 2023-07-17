import mongoose from "mongoose";

const Area = mongoose.Schema({
  kode: {
    type: String,
    required: true,
  },
  wilayah: {
    type: String,
    required: true,
  },
  kota: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Area", Area);

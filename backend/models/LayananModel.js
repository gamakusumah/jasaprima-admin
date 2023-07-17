import mongoose from "mongoose";

const Layanan = mongoose.Schema({
  namaLayanan: {
    type: String,
    required: true,
  },
  kode: {
    type: String,
    required: true,
  },
  hargaK: {
    type: Number,
    required: true,
  },
  hargaN: {
    type: Number,
    required: true,
  },
  waktu: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Layanan", Layanan);

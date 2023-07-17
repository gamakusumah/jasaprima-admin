import mongoose from "mongoose";

const Kantor = mongoose.Schema({
  kodeKantor: {
    type: String,
    required: true,
  },
  wilayahKantor: {
    type: String,
    required: true,
  },
  statusKantor: {
    type: String,
    required: true,
  },
  alamatKantor: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Kantor", Kantor);

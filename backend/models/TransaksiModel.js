import mongoose from "mongoose";

const Transaksi = mongoose.Schema(
  {
    noBon: {
      type: String,
      required: true,
    },
    wp: {
      nama: {
        type: String,
      },
      nomorHP: {
        type: String,
      },
      alamat: {
        type: String,
      },
    },
    noPol: {
      nomor: {
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
    layanan: {
      nama: {
        type: String,
        required: true,
      },
      ktp: {
        type: Boolean,
        required: true,
      },
    },
    area: {
      type: String,
      required: true,
    },
    persyaratan: [],
    harga: {
      jasa: {
        type: Number,
        required: true,
      },
      pajak: {
        type: Number,
        required: true,
      },
      lain: {
        type: Number,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    berkas: {
      type: String,
      required: true,
    },
    kantor: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    keterangan: {
      type: String,
    },
    pembayaran: {
      status: {
        type: String,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      detail: [
        {
          type: new mongoose.Schema(
            {
              jumlah: {
                type: Number,
                required: true,
              },
              metode: {
                type: String,
                required: true,
              },
            },
            { timestamps: { createdAt: true, updatedAt: false } }
          ),
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaksi", Transaksi);

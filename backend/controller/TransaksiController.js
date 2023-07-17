import Transaksi from "../models/TransaksiModel.js";

export const getTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.find().sort({ createdAt: -1 });
    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransaksiById = async (req, res) => {
  try {
    const transaksiById = await Transaksi.findById(req.params.id);
    res.json(transaksiById);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveTransaksi = async (req, res) => {
  const transaksi = new Transaksi(req.body);
  try {
    const newTransaksi = await transaksi.save();
    res.status(201).json(newTransaksi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTransaksi = async (req, res) => {
  try {
    const updatedTransaksi = await Transaksi.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatedTransaksi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTransaksi = async (req, res) => {
  try {
    const deletedTransaksi = await Transaksi.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedTransaksi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTunggakan = async (req, res) => {
  try {
    const tunggakan = await Transaksi.aggregate([
      {
        $group: {
          _id: "$kantor",
          totalTransaksi: { $sum: 1 },
          totalHarga: { $sum: "$harga.total" },
          totalPembayaran: { $sum: "$pembayaran.total" },
        },
      },
      {
        $addFields: {
          sisaPembayaran: { $subtract: ["$totalPembayaran", "$totalHarga"] },
        },
      },
      { $sort: { sisaPembayaran: 1 } },
    ]);
    res.send(tunggakan);
    res.status(500);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filterTransaksi = async (req, res) => {
  const query = req.query;
  if (Object.hasOwn(query, "from") || Object.hasOwn(query, "to")) {
    const to = query.to;
    const newTo = to.split("-");
    query.createdAt = {
      $gte: new Date(`${query.from}`),
      $lte: new Date(
        `${newTo[0]}-${newTo[1]}-${(parseInt(newTo[2]) + 1).toString()}`
      ),
    };
    delete query.from;
    delete query.to;
  }

  try {
    const transaksi = await Transaksi.find(query).sort({ createdAt: -1 });
    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

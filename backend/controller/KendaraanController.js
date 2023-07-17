import Kendaraan from "../models/KendaraanModel.js";

export const getKendaraan = async (req, res) => {
  try {
    const kendaraan = await Kendaraan.find();
    res.json(kendaraan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getKendaraanById = async (req, res) => {
  try {
    const kendaraan = await Kendaraan.findById({ _id: req.params.id });
    res.json(kendaraan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveKendaraan = async (req, res) => {
  const kendaraan = new Kendaraan(req.body);
  try {
    const insertedKendaraan = await kendaraan.save();
    res.status(201).json(insertedKendaraan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateKendaraan = async (req, res) => {
  try {
    const kendaraan = await Kendaraan.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(kendaraan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteKendaraan = async (req, res) => {
  try {
    const kendaraan = await Kendaraan.deleteOne({ _id: req.params.id });
    res.status(200).json(kendaraan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getKendaraanByNoPol = async (req, res) => {
  try {
    const kendaraan = await Kendaraan.findOne({ noPol: req.params.noPol });
    res.json(kendaraan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

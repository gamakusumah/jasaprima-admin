import Layanan from "../models/LayananModel.js";

export const getLayanan = async (req, res) => {
  try {
    const layanan = await Layanan.find();
    res.json(layanan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLayananById = async (req, res) => {
  try {
    const layanan = await Layanan.findById(req.params.id);
    res.json(layanan);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveLayanan = async (req, res) => {
  const layanan = new Layanan(req.body);
  try {
    const insertedLayanan = await layanan.save();
    res.status(201).json(insertedLayanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateLayanan = async (req, res) => {
  try {
    const updatedLayanan = await Layanan.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(201).json(updatedLayanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteLayanan = async (req, res) => {
  try {
    const deletedLayanan = await Layanan.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedLayanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

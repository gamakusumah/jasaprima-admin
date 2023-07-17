import Kantor from "../models/KantorModel.js";

export const getKantor = async (req, res) => {
  try {
    const kantor = await Kantor.find();
    res.json(kantor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getKantorById = async (req, res) => {
  try {
    const kantor = await Kantor.findById(req.params.id);
    res.json(kantor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const saveKantor = async (req, res) => {
  const kantor = new Kantor(req.body);
  try {
    const insertedKantor = await kantor.save();
    res.status(201).json(insertedKantor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateKantor = async (req, res) => {
  try {
    const updatedKantor = await Kantor.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatedKantor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteKantor = async (req, res) => {
  try {
    const deletedKantor = await Kantor.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedKantor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

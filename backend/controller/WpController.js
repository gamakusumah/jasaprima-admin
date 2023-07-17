import Wp from "../models/WpModel.js";

export const getWps = async (req, res) => {
  try {
    const wps = await Wp.find();
    res.json(wps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWpById = async (req, res) => {
  try {
    const wp = await Wp.findById(req.params.id);
    res.json(wp);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getWpByNoHP = async (req, res) => {
  try {
    const wp = await Wp.findOne({ nomorHP: req.params.noHP });
    res.json(wp);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveWp = async (req, res) => {
  const wp = new Wp(req.body);
  try {
    const insertedWp = await wp.save();
    res.status(201).json(insertedWp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateWp = async (req, res) => {
  try {
    const updatedWp = await Wp.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatedWp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteWp = async (req, res) => {
  try {
    const deletedWp = await Wp.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedWp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

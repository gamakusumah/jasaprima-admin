import Area from "../models/AreaModel.js";

export const getArea = async (req, res) => {
  try {
    const area = await Area.find();
    res.json(area);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAreaById = async (req, res) => {
  try {
    const area = await Area.findById({ _id: req.params.id });
    res.json(area);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveArea = async (req, res) => {
  const area = new Area(req.body);
  try {
    const newArea = await area.save();
    res.status(201).json(newArea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateArea = async (req, res) => {
  try {
    const area = await Area.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(area);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteArea = async (req, res) => {
  try {
    const area = await Area.deleteOne({ _id: req.params.id });
    res.status(200).json(area);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

import Admin from "../models/AdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find(
      {},
      { nama: 1, email: 1, nomorHP: 1, kantor: 1, level: 1 }
    );
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res.json(admin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAdminByEmail = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.params.email });
    res.json(admin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = await Admin.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const deletedAdmin = await Admin.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const saveAdmin = async (req, res) => {
  const { nama, email, nomorHP, password, confPassword, kantor, level } =
    req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Konfirmasi Password tidak sesuai!" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const admin = new Admin({
    nama,
    email,
    nomorHP,
    password: hashPassword,
    kantor,
    level,
  });
  try {
    const insertedAdmin = await admin.save();
    res.status(201).json(insertedAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const Masuk = async (req, res) => {
  try {
    const admin = await Admin.find({ email: req.body.email });
    const match = await bcrypt.compare(req.body.password, admin[0].password);
    if (!match) return res.status(400).json({ msg: "Password salah!" });

    const _id = admin[0]._id;
    const nama = admin[0].nama;
    const email = admin[0].email;
    const kantor = admin[0].kantor;
    const level = admin[0].level;

    const accessToken = jwt.sign(
      { _id, nama, email, kantor, level },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );
    const refreshToken = jwt.sign(
      { _id, nama, email, kantor, level },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    await Admin.updateOne({ _id }, { $set: { refreshToken } });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Akun tidak terdaftar!" });
  }
};

export const Keluar = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const admin = await Admin.find({ refreshToken });
  if (!admin[0]) return res.sendStatus(403);
  const _id = admin[0]._id;
  await Admin.updateOne({ _id }, { $set: { refreshToken: null } });
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

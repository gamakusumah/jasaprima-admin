import Admin from "../models/AdminModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const admin = await Admin.find({ refreshToken });
    if (!admin[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const _id = admin[0]._id;
        const nama = admin[0].nama;
        const email = admin[0].email;
        const nomorHP = admin[0].nomorHP;
        const kantor = admin[0].kantor;
        const level = admin[0].level;
        const accessToken = jwt.sign(
          { _id, nama, email, nomorHP, kantor, level },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15s" }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

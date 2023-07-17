import express from "express";
import {
  deleteKendaraan,
  getKendaraan,
  getKendaraanById,
  getKendaraanByNoPol,
  saveKendaraan,
  updateKendaraan,
} from "../controller/KendaraanController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
const router = express.Router();

router.get("/kendaraan", verifyToken, getKendaraan);
router.post("/kendaraan/tambah", saveKendaraan);
router.get("/kendaraan/:id", getKendaraanById);
router.patch("/kendaraan/edit/:id", updateKendaraan);
router.delete("/kendaraan/:id", deleteKendaraan);
router.get("/kendaraan/noPol/:noPol", getKendaraanByNoPol);

export default router;

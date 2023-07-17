import express from "express";
import {
  deleteLayanan,
  getLayanan,
  getLayananById,
  saveLayanan,
  updateLayanan,
} from "../controller/LayananController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
const router = express.Router();

router.get("/layanan", verifyToken, getLayanan);
router.get("/layanan/:id", getLayananById);
router.post("/layanan/tambah", saveLayanan);
router.patch("/layanan/edit/:id", updateLayanan);
router.delete("/layanan/:id", deleteLayanan);

export default router;

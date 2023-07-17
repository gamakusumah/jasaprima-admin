import express from "express";
import {
  getTransaksi,
  getTransaksiById,
  saveTransaksi,
  updateTransaksi,
  deleteTransaksi,
  getTunggakan,
  filterTransaksi,
} from "../controller/TransaksiController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
const router = express.Router();

router.get("/transaksi", verifyToken, getTransaksi);
router.get("/transaksi/:id", verifyToken, getTransaksiById);
router.post("/transaksi/tambah", saveTransaksi);
router.patch("/transaksi/edit/:id", updateTransaksi);
router.delete("/transaksi/:id", deleteTransaksi);
router.get("/transaksi-group", getTunggakan);
router.get("/transaksi-filter", verifyToken, filterTransaksi);

export default router;

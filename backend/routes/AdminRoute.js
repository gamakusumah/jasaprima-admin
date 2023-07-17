import express from "express";
import {
  getAdmins,
  getAdminById,
  saveAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminByEmail,
  Masuk,
  Keluar,
} from "../controller/AdminController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
const router = express.Router();

router.get("/admin", verifyToken, getAdmins);
router.get("/admin/:id", verifyToken, getAdminById);
router.post("/masuk", Masuk);
router.post("/admin/tambah", saveAdmin);
router.patch("/admin/edit/:id", updateAdmin);
router.delete("/admin/:id", deleteAdmin);
router.get("/token", refreshToken);
router.delete("/keluar", Keluar);

export default router;

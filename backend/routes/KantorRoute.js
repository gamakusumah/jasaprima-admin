import express from "express";
import {
  deleteKantor,
  getKantor,
  getKantorById,
  saveKantor,
  updateKantor,
} from "../controller/KantorController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
const router = express.Router();

router.get("/kantor", verifyToken, getKantor);
router.post("/kantor/tambah", saveKantor);
router.get("/kantor/:id", getKantorById);
router.patch("/kantor/edit/:id", updateKantor);
router.delete("/kantor/:id", deleteKantor);

export default router;

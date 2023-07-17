import express from "express";
import {
  deleteArea,
  getArea,
  getAreaById,
  saveArea,
  updateArea,
} from "../controller/AreaController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
const router = express.Router();

router.get("/area", verifyToken, getArea);
router.get("/area/:id", getAreaById);
router.post("/area/tambah", saveArea);
router.patch("/area/edit/:id", updateArea);
router.delete("/area/:id", deleteArea);

export default router;

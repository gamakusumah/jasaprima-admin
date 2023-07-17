import express from "express";
import {
  deleteWp,
  getWpById,
  getWpByNoHP,
  getWps,
  saveWp,
  updateWp,
} from "../controller/WpController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
const router = express.Router();

router.get("/wp", verifyToken, getWps);
router.get("/wp/:id", getWpById);
router.get("/wp/noHP/:noHP", getWpByNoHP);
router.post("/wp/tambah", saveWp);
router.patch("/wp/edit/:id", updateWp);
router.delete("/wp/:id", deleteWp);

export default router;

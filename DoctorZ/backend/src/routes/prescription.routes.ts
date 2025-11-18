import express from "express"
import { addPrescription } from "../controllers/prescription.controller.js";

const router=express.Router();
router.post("/addPrescription",addPrescription);
export default router;
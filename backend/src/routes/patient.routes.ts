import mongoose from "mongoose";
import { Router } from "express";
// import patientRegister from "../controllers/patient.controller.js";
import patientController from "../controllers/patient.controller.js";

const router = Router();

router.post("/register",patientController.patientRegister);
router.get("/:id",patientController.getPatientById);
router.delete(":/id",patientController.deleteUser)

export default router;
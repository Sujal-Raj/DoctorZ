import mongoose from "mongoose";
import { Router } from "express";
// import patientRegister from "../controllers/patient.controller.js";
import patientController from "../controllers/patient.controller.js";

const router = Router();

router.post("/register",patientController.patientRegister);
router.post("/login",patientController.patientLogin);
router.get("/:id",patientController.getPatientById);
router.delete("/:id",patientController.deleteUser);
router.get("/slots/:doctorId/:date",patientController.getAvailableSlotsByDoctorId);


export default router;



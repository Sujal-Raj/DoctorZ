import mongoose from "mongoose";
import { Router } from "express";

import patientController from "../controllers/patient.controller.js";
import multer from "multer";
const router = Router();
// ✅ Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/reports/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });
router.post(
  "/register",
 upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "medicalReports", maxCount: 10 }
])
,  
  patientController.patientRegister
);
router.post("/login",patientController.patientLogin);
router.get("/:id",patientController.getPatientById);
router.delete("/:id",patientController.deleteUser);
router.put("/update/:id", patientController.updatePatient);

// router.get("/slots/:doctorId/:date",patientController.getAvailableSlotsByDoctorId);
router.get("/slots/:doctorId",patientController.getAvailableSlotsByDoctorId);
router.get("/appointments/doctors/:id",patientController.getBookedDoctor);
router.post("/favourite-doctor/:id",patientController.addFavouriteDoctor);
router.get("/isFavourite/:patientId/:doctorId",patientController.isFavouriteDoctor);
router.post("/favourite-clinic/:id",patientController.addfavouriteClinic);
router.get("/isFavouriteClinic/:patientId/:clinicId",patientController.isFavouriteClinic);
export default router;



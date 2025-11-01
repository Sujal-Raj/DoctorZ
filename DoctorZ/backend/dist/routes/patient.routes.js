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
router.post("/register", upload.array("medicalReports"), patientController.patientRegister);
router.post("/login", patientController.patientLogin);
router.get("/:id", patientController.getPatientById);
router.delete("/:id", patientController.deleteUser);
router.get("/slots/:doctorId", patientController.getAvailableSlotsByDoctorId);
export default router;
//# sourceMappingURL=patient.routes.js.map
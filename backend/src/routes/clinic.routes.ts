import express from "express"
import { clinicRegister, deleteClinic, getAllClinic, searchClinicAndDoctor, updateClinic } from "../controllers/clinic.controller.js";
import { upload } from "../middlewares/upload.js";

const router=express.Router();

// Route with single file upload
router.post("/register", upload.single("registrationCert"), clinicRegister);
router.put("/update/:id",updateClinic);
router.delete("/delete/:id",deleteClinic);
router.get("/search",searchClinicAndDoctor);
router.get("/getClinic",getAllClinic);
export default router;
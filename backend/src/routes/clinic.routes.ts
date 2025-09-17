import express from "express"
import { clinicRegister, deleteClinic, getAllClinic, searchClinic, updateClinic } from "../controllers/clinic.controller.js";
const router=express.Router();
router.post("/register",clinicRegister);
router.put("/update/:id",updateClinic);
router.delete("/delete/:id",deleteClinic);
router.get("/search",searchClinic);
router.get("/getClinic",getAllClinic);
export default router;
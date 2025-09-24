import mongoose from "mongoose";
import doctorController from "../controllers/doctor.controller.js";
import Router from 'express';
import { upload } from "../middlewares/upload.js";
const router = Router();

router.post('/register',upload.fields([
  { name: 'degreeCert', maxCount: 1 },
  { name: 'photo', maxCount: 1 },
  { name: 'signature', maxCount: 1 },]),doctorController.doctorRegister);
router.get('/allDoctors',doctorController.getAllDoctors);
router.get('/:id',doctorController.getDoctorById);
router.delete('/:id',doctorController.deleteDoctor)
router.put('/:id',doctorController.updateDoctor);

export default router;
import mongoose from "mongoose";
import doctorController from "../controllers/doctor.controller.js";
import Router from 'express';
const router = Router();
router.post('/register', doctorController.doctorRegister);
router.get('/:id', doctorController.getDoctorById);
router.delete('/:id', doctorController.deleteDoctor);
router.put('/:id', doctorController.updateDoctor);
export default router;
//# sourceMappingURL=doctor.routes.js.map
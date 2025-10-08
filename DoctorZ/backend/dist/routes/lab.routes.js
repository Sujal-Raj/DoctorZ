import mongoose from "mongoose";
import { Router } from "express";
// import patientRegister from "../controllers
import labController from "../controllers/lab.controller.js";
const router = Router();
router.post("/register", labController.labRegister);
router.post("/login", labController.labLogin);
// router.get("/:id",patientController.getPatientById);
// router.delete("/:id",patientController.deleteUser)
router.get("/alllabtests", labController.getAllLabTests);
router.post("/addTestData", labController.addTestBooking);
export default router;
//# sourceMappingURL=lab.routes.js.map
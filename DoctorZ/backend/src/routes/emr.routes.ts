import { createEMR } from "../controllers/emr.controller.js";
import { getEMRByPatientId } from "../controllers/emr.controller.js";

import express from "express";
import { upload } from "../middlewares/upload.js";
const router = express.Router();

router.post("/createEmr", upload.array("reports"), createEMR);

router.get("/:patientId", getEMRByPatientId);
export default router;
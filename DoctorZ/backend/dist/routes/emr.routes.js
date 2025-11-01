import { createEMR } from "../controllers/emr.controller.js";
import express from "express";
import { upload } from "../middlewares/upload.js";
const router = express.Router();
router.post("/createEmr", upload.array("reports"), createEMR);
export default router;
//# sourceMappingURL=emr.routes.js.map
import express from "express";
import { adminLogin, getPendingDoctors, approveDoctor, rejectDoctor, rejectLab, approveLab, getPendingLabs } from "../controllers/admin.controller.js";
// import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();
//  Admin Login
router.post("/login", adminLogin);
// Get all pending doctor requests
router.get("/doctors/pending", getPendingDoctors);
//  Approve doctor
router.post("/doctor/:id/approve", approveDoctor);
//  Reject doctor
router.post("/doctor/:id/reject", rejectDoctor);
//get all labs
router.get("/labs/pending", getPendingLabs);
//  Approve lab
router.put("/lab/:id/approve", approveLab);
// Reject lab
router.put("/lab/:id/reject", rejectLab);
export default router;
//# sourceMappingURL=admin.routes.js.map
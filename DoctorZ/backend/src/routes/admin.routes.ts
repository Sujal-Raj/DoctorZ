import express from "express";
import { adminLogin, getPendingDoctors, approveDoctor, rejectDoctor } from "../controllers/admin.controller.js";
// import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 🔹 Admin Login
router.post("/login", adminLogin);

// 🔹 Get all pending doctor requests
router.get("/doctors/pending",   getPendingDoctors);

// 🔹 Approve doctor
router.post("/doctor/:id/approve",  approveDoctor);

// 🔹 Reject doctor
router.post("/doctor/:id/reject",  rejectDoctor);

export default router;
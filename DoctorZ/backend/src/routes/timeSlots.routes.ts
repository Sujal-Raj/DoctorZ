import express from "express";
import { createTimeSlot, getTimeSlots, updateSlot } from "../controllers/timeSlots.controller.js";

const router = express.Router();
router.post("/createTimeSlot", createTimeSlot);
router.get("/getTimeSlots/:doctorId", getTimeSlots);
router.patch("/updateSlot/:id", updateSlot);
export default router;
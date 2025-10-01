import { Router } from "express";
import { bookAppointment, getBookingsByPatient, getBookingsByDoctor } from "../controllers/booking.controller.js";

const router = Router();

router.post("/book", bookAppointment);
router.get("/patient/:patientId", getBookingsByPatient);
router.get("/doctor/:doctorId", getBookingsByDoctor);

export default router;

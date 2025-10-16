import { Router } from "express";
import { bookAppointment, getBookingsByPatient, getBookingsByDoctor, updateBookingStatus } from "../controllers/booking.controller.js";
const router = Router();
router.post("/book", bookAppointment);
router.get("/patient/:patientId", getBookingsByPatient);
router.get("/doctor/:doctorId", getBookingsByDoctor);
router.put("/:bookingId/status", updateBookingStatus);
export default router;
//# sourceMappingURL=booking.routes.js.map
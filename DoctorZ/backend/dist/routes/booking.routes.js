import { Router } from "express";
import { bookAppointment, getBookingsByDoctor, updateBookingStatus } from "../controllers/booking.controller.js";
import { upload } from "../middlewares/upload.js";
const router = Router();
router.post("/book", upload.array("reports"), bookAppointment);
// router.get("/patient/:patientId", getBookingsByPatient);
router.get("/doctor/:doctorId", getBookingsByDoctor);
router.put("/:bookingId/status", updateBookingStatus);
export default router;
//# sourceMappingURL=booking.routes.js.map
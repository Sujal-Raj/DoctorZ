import BookingModel from "../models/booking.model.js";
import timeSlotsModel from "../models/timeSlots.model.js";
// ✅ Book appointment
export const bookAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, slotId, datetime, mode, fees } = req.body;
        if (!patientId || !doctorId || !slotId || !datetime || !mode) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        // check if slot already booked
        const existingBooking = await BookingModel.findOne({ slotId, datetime, status: "booked" });
        if (existingBooking) {
            return res.status(400).json({ message: "This slot is already booked" });
        }
        // create booking
        const booking = new BookingModel({
            patientId,
            doctorId,
            slotId,
            datetime,
            mode,
            fees,
            status: "booked",
        });
        await booking.save();
        // Mark slot as inactive after booking
        await timeSlotsModel.updateOne({ "slots._id": slotId }, { $set: { "slots.$.isActive": false } });
        return res.status(201).json({
            message: "Appointment booked successfully",
            booking,
        });
    }
    catch (err) {
        console.error("Booking error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// ✅ Get bookings by patient
export const getBookingsByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        const bookings = await BookingModel.find({ patientId }).populate("doctorId slotId");
        return res.json({ bookings });
    }
    catch (err) {
        console.error("Error fetching patient bookings:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// ✅ Get bookings by doctor
export const getBookingsByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const bookings = await BookingModel.find({ doctorId }).populate("patientId");
        const slotDocs = await timeSlotsModel.find({ doctorId });
        const bookingsWithSlot = bookings.map(b => {
            const slotDoc = slotDocs.find(d => d.slots.some(s => s._id.toString() === b.slotId.toString()));
            const slotInfo = slotDoc?.slots.find(s => s._id.toString() === b.slotId.toString());
            return {
                ...b.toObject(),
                slot: slotInfo || null
            };
        });
        return res.json({ bookings: bookingsWithSlot });
    }
    catch (err) {
        console.error("Error fetching doctor bookings:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=booking.controller.js.map
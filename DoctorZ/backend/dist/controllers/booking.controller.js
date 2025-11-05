// import type { Request, Response } from "express";
// import BookingModel from "../models/booking.model.js";
// import timeSlotsModel from "../models/timeSlots.model.js";
import BookingModel from "../models/booking.model.js";
import timeSlotsModel from "../models/timeSlots.model.js";
// ✅ Book appointment
export const bookAppointment = async (req, res) => {
    try {
        const { patient, doctorId, slotId, datetime, mode, fees, userId } = req.body;
        if (!patient || !doctorId || !slotId || !datetime || !mode || !userId) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const roomId = `room_${doctorId}_${userId}_${Date.now()}`;
        // check if slot already booked
        const existingBooking = await BookingModel.findOne({ slotId, datetime, status: "booked" });
        if (existingBooking) {
            return res.status(400).json({ message: "This slot is already booked" });
        }
        // create booking
        const booking = new BookingModel({
            userId,
            patient, // embedded patient info
            doctorId,
            slotId,
            datetime,
            mode,
            fees,
            status: "booked",
            roomId,
        });
        await booking.save();
        // Mark slot as inactive after booking
        await timeSlotsModel.updateOne({ "slots._id": slotId }, { $set: { "slots.$.isActive": false } });
        return res.status(201).json({
            message: "Appointment booked successfully",
            booking,
            roomId,
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
        const { userId } = req.params; // now fetch by userId
        const bookings = await BookingModel.find({ userId }).populate("doctorId slotId");
        return res.json({ bookings });
    }
    catch (err) {
        console.error("Error fetching patient bookings:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// ✅ Get bookings by doctor
// export const getBookingsByDoctor = async (req: Request, res: Response) => {
//   try {
//     const { doctorId } = req.params;
//     const bookings = await BookingModel.find({ doctorId }).populate("doctorId slotId");
//     const slotDocs = await timeSlotsModel.find({ doctorId });
//     const bookingsWithSlot = bookings.map(b => {
//       const slotDoc = slotDocs.find(d =>
//         d.slots.some(s => s._id.toString() === b.slotId.toString())
//       );
//       const slotInfo = slotDoc?.slots.find(s => s._id.toString() === b.slotId.toString());
//       return {
//         ...b.toObject(),
//         slot: slotInfo || null
//       };
//     });
//     return res.json({ bookings: bookingsWithSlot });
//   } catch (err) {
//     console.error("Error fetching doctor bookings:", err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
import Booking from "../models/booking.model.js";
export const getBookingsByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        // Find all bookings for this doctor
        const bookings = await Booking.find({ doctorId })
            .populate("userId", "fullName email phone") // optional populate of patient user
            .populate("slotId") // this will give you full slot info
            .lean();
        if (!bookings || bookings.length === 0) {
            return res.status(200).json({ bookings: [] });
        }
        // Safely map each booking
        const safeBookings = bookings.map((b) => ({
            ...b,
            slot: b.slotId ? b.slotId : null, // if slotId is null, prevent crash
        }));
        return res.status(200).json({ bookings: safeBookings });
    }
    catch (err) {
        console.error("Error fetching doctor bookings:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body; // expected: "completed" or "cancelled"
        if (!["completed", "cancelled", "booked"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }
        const booking = await BookingModel.findByIdAndUpdate(bookingId, { status }, { new: true });
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        return res.json({ message: "Booking updated successfully", booking });
    }
    catch (err) {
        console.error("Error updating booking status:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=booking.controller.js.map
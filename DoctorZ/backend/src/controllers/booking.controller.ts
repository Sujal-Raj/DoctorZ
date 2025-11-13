import type { Request, Response } from "express";
import BookingModel from "../models/booking.model.js";
import timeSlotsModel from "../models/timeSlots.model.js";
import EMRModel from "../models/emr.model.js";



// export const bookAppointment = async (req:Request, res:Response) => {
//   try {
//     const {
//       patient,
//       doctorId,
//       slot,
//       slotId,
//       dateTime,
//       mode,
//       fees,
//       userId,
//     } = req.body;

//       console.log("📦 Booking Received:", req.body);
//       console.log("📦 Booking Received:", req.body);
// console.log("Types:", {
//   doctorId: typeof doctorId,
//   userId: typeof userId,
//   slot: typeof slot,
//   dateTime: typeof dateTime,
//   mode: typeof mode,
//   fees: typeof fees,
//   patient: typeof patient
// });




//     if (!patient || !doctorId || !slot || !dateTime || !mode || !userId || !fees) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // ✅ Check if patient already has booking today
//     const existingAadharBooking = await BookingModel.findOne({
//       "patient.aadhar": patient.aadhar,
//       dateTime,
//       status: "booked"
//     });

//     if (existingAadharBooking) {
//         console.log("❌ Duplicate booking found:", existingAadharBooking);
//       return res.status(400).json({
//         message: "An appointment already exists for this Aadhar number."
//       });
//     }

//     // ✅ Check if slot already booked
//     const existingSlot = await BookingModel.findOne({
//       slot,
//       dateTime,
//       status: "booked",
//     });

//     if (existingSlot) {
//       return res.status(400).json({ message: "This slot is already booked" });
//     }

//    // ✅ Create EMR record automatically before booking
//     const newEmr = await EMRModel.create({
//        aadhar: patient.aadhar,
//       doctorId,
//     });

//     // ✅ Create Booking
//     const booking = await BookingModel.create({
//       userId,
//       patient,
//       doctorId,
//       slot,
//       slotId,
//       dateTime:new Date(dateTime),
//       mode,
//       fees,
//       status: "booked",
//     });

//     // ✅ Mark slot inactive
//     await timeSlotsModel.updateOne(
//       { "slots._id": slotId},
//       { $set: { "slots.$.isActive": false } }
//     );

//     return res.status(201).json({
//       message: "Appointment booked successfully",
//       booking,
//       emr: newEmr,
      
//     });
//   } catch (err) {
//     console.error("Booking error:", err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };


// // ✅ Get bookings by patient
// export const getBookingsByPatient = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params; // now fetch by userId
//     const bookings = await BookingModel.find({ userId }).populate("doctorId slotId");
//     return res.json({ bookings });
//   } catch (err) {
//     console.error("Error fetching patient bookings:", err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

export const bookAppointment = async (req: Request, res: Response) => {
  try {
    const {
      patient,
      doctorId,
      slot,
      slotId,
      dateTime,
      mode,
      fees,
      userId,
    } = req.body;

    console.log("📦 Booking Received:", req.body);
    console.log("Types:", {
      doctorId: typeof doctorId,
      userId: typeof userId,
      slot: typeof slot,
      dateTime: typeof dateTime,
      mode: typeof mode,
      fees: typeof fees,
      patient: typeof patient,
    });

    if (!patient || !doctorId || !slot || !dateTime || !mode || !userId || !fees) {
      return res.status(400).json({ message: "Missing required fields" });
    }

//     // ✅ Check duplicate booking (same patient + same date)
//     const existingAadharBooking = await BookingModel.findOne({
//   "patient.aadhar": patient.aadhar,
//   status: "booked",
//   dateTime: {
//     $gte: new Date(new Date(dateTime).setHours(0, 0, 0, 0)),  // start of the day
//     $lt: new Date(new Date(dateTime).setHours(23, 59, 59, 999)), // end of the day
//   },
// });

// if (existingAadharBooking) {
//   console.log("❌ Duplicate booking found:", existingAadharBooking);
//   return res.status(400).json({
//     message: "An appointment already exists for this Aadhar number on this date.",
//   });
// }
    

    // ✅ Check if slot already booked
    const existingSlot = await BookingModel.findOne({
      slot,
      dateTime,
      status: "booked",
    });

    if (existingSlot) {
      return res.status(400).json({ message: "This slot is already booked" });
    }

    // ✅ Separate EMR-related data from patient
    const {
      allergies,
      diseases,
      pastSurgeries,
      currentMedications,
      name,
      age,
      gender,
      aadhar,
      contact,
      relation,
    } = patient;

    // ✅ Create Booking (only basic patient info)
    const booking = await BookingModel.create({
      userId,
      doctorId,
      slot,
      slotId,
      dateTime: new Date(dateTime),
      mode,
      fees,
      status: "booked",
      patient: {
        name,
        age,
        gender,
        aadhar,
        contact,
        relation,
      },
    });

    // ✅ Create EMR entry only if EMR data exists
    if (
      (allergies && allergies.length > 0) ||
      (diseases && diseases.length > 0) ||
      (pastSurgeries && pastSurgeries.length > 0) ||
      (currentMedications && currentMedications.length > 0)
    ) {
      await EMRModel.create({
        doctorId,
        aadhar,
        allergies: allergies || [],
        diseases: diseases || [],
        pastSurgeries: pastSurgeries || [],
        currentMedications: currentMedications || [],
      });
    }

    // ✅ Mark slot inactive
    await timeSlotsModel.updateOne(
      { "slots._id": slotId },
      { $set: { "slots.$.isActive": false } }
    );

    return res.status(201).json({
      message: "Appointment booked successfully",
      booking,
    });
  } catch (err) {
    console.error("Booking error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// export const bookAppointment = async (req: Request, res: Response) => {
//   try {
//     let { patient, doctorId, slot, slotId, dateTime, mode, fees, userId } = req.body;

//     // If using FormData, patient will be a string, parse it
//     if (typeof patient === "string") {
//       patient = JSON.parse(patient);
//     }

//     console.log("📦 Booking Received:", req.body);
//     console.log("Types after parsing patient:", {
//       doctorId: typeof doctorId,
//       userId: typeof userId,
//       slot: typeof slot,
//       dateTime: typeof dateTime,
//       mode: typeof mode,
//       fees: typeof fees,
//       patient: typeof patient,
//     });

//     if (!patient || !doctorId || !slot || !dateTime || !mode || !userId || !fees) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const {
//       allergies,
//       diseases,
//       pastSurgeries,
//       currentMedications,
//       name,
//       age,
//       gender,
//       aadhar,
//       contact,
//       relation,
//     } = patient;

//     // ✅ Create Booking
//     const booking = await BookingModel.create({
//       userId,
//       doctorId,
//       slot,
//       slotId,
//       dateTime: new Date(dateTime),
//       mode,
//       fees,
//       status: "booked",
//       patient: {
//         name,
//         age,
//         gender,
//         aadhar,
//         contact,
//         relation,
//         // allergies: allergies || [],
//         // diseases: diseases || [],
//         // pastSurgeries: pastSurgeries || [],
//         // currentMedications: currentMedications || [],
//       },
//     });

//     // ✅ Optional: create EMR if any EMR data exists
//     if (
//       (allergies && allergies.length > 0) ||
//       (diseases && diseases.length > 0) ||
//       (pastSurgeries && pastSurgeries.length > 0) ||
//       (currentMedications && currentMedications.length > 0)
//     ) {
//       await EMRModel.create({
//         doctorId,
//         aadhar,
//         allergies: allergies || [],
//         diseases: diseases || [],
//         pastSurgeries: pastSurgeries || [],
//         currentMedications: currentMedications || [],
//       });
//     }

//     await timeSlotsModel.updateOne(
//       { "slots._id": slotId },
//       { $set: { "slots.$.isActive": false } }
//     );

//     return res.status(201).json({
//       message: "Appointment booked successfully",
//       booking,
//     });
//   } catch (err) {
//     console.error("Booking error:", err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };


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

export const getBookingsByDoctor = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;

    // Find all bookings for this doctor
    const bookings = await Booking.find({ doctorId })
      .populate("userId", "fullName email phone") // patient info
      .populate("slotId") // slot info
      .lean();

    if (!bookings || bookings.length === 0) {
      return res.status(200).json({ bookings: [] });
    }

    // Add EMR data for each booking's patient
    const bookingsWithEMR = await Promise.all(
      bookings.map(async (b) => {
        const emrData = await EMRModel.find({ patientId: b.userId?._id })
          .sort({ createdAt: -1 })
          .lean();

        return {
          ...b,
          slot: b.slot || null,
          emr: emrData || [], // include EMR records for this patient
        };
      })
    );

    return res.status(200).json({ bookings: bookingsWithEMR });
  } catch (err) {
    console.error("Error fetching doctor bookings:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// export const getBookingsByDoctor = async (req: Request, res: Response) => {
//   try {
//     const { doctorId } = req.params;

//     // Find all bookings for this doctor
//     const bookings = await Booking.find({ doctorId })
//       .populate("userId", "fullName email phone") // optional populate of patient user
//       .populate("slotId") // this will give you full slot info
//       .lean();

//     if (!bookings || bookings.length === 0) {
//       return res.status(200).json({ bookings: [] });
//     }

//     // Safely map each booking
//     const safeBookings = bookings.map((b) => ({
//       ...b,
//       slot: b.slotId ? b.slotId : null, // if slotId is null, prevent crash
//     }));

//     return res.status(200).json({ bookings: safeBookings });
//   } catch (err) {
//     console.error("Error fetching doctor bookings:", err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };


export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body; // expected: "completed" or "cancelled"

    if (!["completed", "cancelled", "booked"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const booking = await BookingModel.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.json({ message: "Booking updated successfully", booking });
  } catch (err) {
    console.error("Error updating booking status:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

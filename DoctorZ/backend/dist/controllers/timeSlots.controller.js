import timeSlotsModel from "../models/timeSlots.model.js";
import { generateTimeSlots } from "../utils/slotGenerator.js";
// export const createTimeSlot = async (req: Request, res: Response) => {
//   try {
//     const { doctorId, dates, workingHours } = req.body;
//     const slots = generateTimeSlots(workingHours.start, workingHours.end);
//     // Array to store new availabilities
//     const availability: any[] = [];
//     for (const date of dates) {
//       const existingSlot = await timeSlotsModel.findOne({
//         doctorId,
//         date: new Date(date),
//       });
//     if (existingSlot) {
//       return res.status(200).json({
//         success: false,
//         exists: true,
//         message: "Slot already exists for this date",
//       });
//       }
//       availability.push({
//         doctorId,
//         date: new Date(date),
//         slots,
//       });
//     }
//     if (availability.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "Slots already exist for the selected dates." });
//     }
//     await timeSlotsModel.insertMany(availability);
//     res.status(200).json({ message: "Availability saved successfully!" });
//   } catch (error) {
//     console.error("Error creating time slot:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
export const createTimeSlot = async (req, res) => {
    try {
        const { doctorId, dates, workingHours } = req.body;
        const slots = generateTimeSlots(workingHours.start, workingHours.end);
        const availability = [];
        const alreadyExistDates = [];
        for (const date of dates) {
            const existingSlot = await timeSlotsModel.findOne({
                doctorId,
                date: new Date(date),
            });
            if (existingSlot) {
                alreadyExistDates.push(date); // collect already existing dates
                continue; // skip this date, baki dates ke liye loop continue
            }
            availability.push({
                doctorId,
                date: new Date(date),
                slots,
            });
        }
        if (availability.length > 0) {
            await timeSlotsModel.insertMany(availability);
        }
        return res.status(200).json({
            success: true,
            message: "Time slots processed successfully",
            createdDates: availability.map((a) => a.date.toISOString().split("T")[0]),
            alreadyExistDates,
        });
    }
    catch (error) {
        console.error("Error creating time slot:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
export const getTimeSlots = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const slots = await timeSlotsModel.find({ doctorId });
        return res.status(200).json(slots);
    }
    catch (error) {
        console.error("Error fetching time slots:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
export const updateSlot = async (req, res) => {
    try {
        const { time, isActive } = req.body;
        const { id } = req.params;
        const timeSlot = await timeSlotsModel.findById(id);
        if (!timeSlot) {
            return res.status(404).json({ message: "Time slot not found" });
        }
        const slot = timeSlot.slots.find((s) => s.time === time);
        if (!slot) {
            return res.status(404).json({ message: "Specific slot not found" });
        }
        slot.isActive = isActive;
        await timeSlot.save();
        return res
            .status(200)
            .json({ message: "Slot updated successfully", slots: timeSlot.slots });
    }
    catch (error) {
        console.error("Error updating slot:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
//# sourceMappingURL=timeSlots.controller.js.map
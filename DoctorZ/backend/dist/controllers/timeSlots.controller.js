import timeSlotsModel from "../models/timeSlots.model.js";
import { generateTimeSlots } from "../utils/slotGenerator.js";
export const createTimeSlot = async (req, res) => {
    try {
        const { doctorId, dates, workingHours } = req.body;
        const slots = generateTimeSlots(workingHours.start, workingHours.end);
        console.log("Generated slots:", slots);
        // Validate input
        // if(!doctorId || !date || !slots || !Array.isArray(date) || !Array.isArray(slots)){
        //   return res.status(400).json({message:"Invalid input data"});
        // }
        // Create entry per date
        const availability = dates.map((date) => ({
            doctorId,
            date: new Date(date),
            slots,
        }));
        await timeSlotsModel.insertMany(availability);
        res.status(200).json({ message: "Availability saved successfully!" });
    }
    catch (error) {
        console.error("Error creating time slot:", error);
        return res.status(500).json({ message: "Server error" });
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
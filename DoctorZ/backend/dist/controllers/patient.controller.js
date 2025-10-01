import mongoose from "mongoose";
import { json } from "stream/consumers";
import patientModel from "../models/patient.model.js";
import bcrypt from "bcryptjs";
import timeSlotsModel from "../models/timeSlots.model.js";
import { get } from "http";
import jwt from "jsonwebtoken";
const patientRegister = async (req, res) => {
    try {
        const body = req.body;
        // console.log(body);
        const { fullName, gender, dob, email, password, mobileNumber, Aadhar, abhaId } = body;
        const { city, pincode } = body.address;
        const { name, number } = body.emergencyContact;
        if (!fullName || !gender || !dob || !mobileNumber || !Aadhar) {
            return res.status(400).json(console.log("All required fields must be filled."));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const patient = new patientModel({
            fullName,
            gender,
            dob,
            email: email.toLowerCase(),
            password: hashedPassword,
            mobileNumber,
            Aadhar,
            abhaId,
            address: {
                city,
                pincode
            },
            emergencyContact: {
                name,
                number
            }
        });
        await patient.save();
        return res.status(201).json({
            message: "Patient Registered"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};
const patientLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required." });
        }
        const patient = await patientModel.findOne({ email: email.toLowerCase() });
        if (!patient) {
            return res.status(400).json({ message: "Invalid Credentials." });
        }
        const isPasswordValid = await bcrypt.compare(password, patient.password);
        console.log(password);
        console.log(patient.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Password." });
        }
        // ✅ JWT Token create
        const token = jwt.sign({ id: patient._id, email: patient.email }, process.env.JWT_SECRET || "secret_key", // 🔒 env me rakho
        { expiresIn: "1d" });
        return res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: patient._id,
                email: patient.email,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong." });
    }
};
const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id)
        const user = await patientModel.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User Not found."
            });
        }
        return res.status(200).json({
            message: "User Found"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong."
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = patientModel.findByIdAndDelete(id);
        if (!deleteUser) {
            return res.status(400).json({
                message: "User Not Found."
            });
        }
        return res.status(200).json({
            message: "User Deleted."
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong."
        });
    }
};
const getAvailableSlotsByDoctorId = async (req, res) => {
    try {
        const { doctorId, date } = req.params;
        if (!doctorId || !date) {
            return res.status(400).json({
                message: "doctorId and date are required",
            });
        }
        // Convert incoming date string (YYYY-MM-DD) to start & end of day
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const slots = await timeSlotsModel.find({
            doctorId,
            date: { $gte: startOfDay, $lte: endOfDay },
        });
        if (!slots || slots.length === 0) {
            return res.status(200).json({
                message: "No slots found for this doctor on the specified date",
                slots: [],
            });
        }
        return res.status(200).json({
            message: "Slots fetched successfully",
            slots,
        });
    }
    catch (error) {
        console.error("Error fetching slots", error);
        return res.status(500).json({
            message: "Failed to fetch slots",
            error: error instanceof Error ? error.message : error,
        });
    }
};
export default { patientRegister, patientLogin, getPatientById, deleteUser, getAvailableSlotsByDoctorId };
//# sourceMappingURL=patient.controller.js.map
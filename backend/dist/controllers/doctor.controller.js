import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { json } from "stream/consumers";
import doctorModel from '../models/doctor.model.js';
const doctorRegister = async (req, res) => {
    try {
        const { fullName, password, gender, dob, MobileNo, MedicalRegistrationNumber, specialization, qualification, DegreeCertificate, experience, consultationFee, language, Aadhar, signature, photo } = req.body;
        if (!fullName || !password || !gender || !dob || !MobileNo) {
            return res.status(400).json(console.log("All required fields must be filled."));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const doctor = new doctorModel({
            fullName,
            password: hashedPassword,
            gender,
            dob,
            MobileNo,
            MedicalRegistrationNumber,
            specialization,
            qualification,
            experience,
            DegreeCertificate,
            consultationFee,
            language,
            Aadhar,
            signature,
            photo,
        });
        await doctor.save();
        return res.status(201).json({
            message: "Doctor registered"
        });
    }
    catch (error) {
        console.log("error", error);
        return res.status(500).json({
            message: "Registration failed"
        });
    }
};
const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const doctor = await doctorModel.findById(id);
        if (!doctor) {
            return res.status(404).json({
                message: 'doctor not found'
            });
        }
        return res.status(200).json({
            message: "doctor found", doctor
        });
    }
    catch (error) {
        console.error("Error fetching doctor", error);
        return res.status(500).json({
            message: "failed to fetch doctor"
        });
    }
};
const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const deltedoctor = await doctorModel.findByIdAndDelete(id);
        if (!deleteDoctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }
        return res.status(202).json({
            message: "doctor deleted successfully", deleteDoctor
        });
    }
    catch (error) {
        console.error("Error deleting doctor", error);
        return res.status(500).json({
            message: "failed to delete doctor"
        });
    }
};
const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const updateDoctor = await doctorModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updateDoctor) {
            return res.status(404).json({
                message: "doctor not found"
            });
        }
        return res.status(202).json({
            message: "doctor updated successfully", updateDoctor
        });
    }
    catch (error) {
        console.error("Error updating doctor ", error);
        return res.status(500).json({
            message: "failed to updated doctor"
        });
    }
};
export default { doctorRegister, getDoctorById, deleteDoctor, updateDoctor };
//# sourceMappingURL=doctor.controller.js.map
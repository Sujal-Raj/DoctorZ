import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import doctorModel from "../models/doctor.model.js";
import nodemailer from 'nodemailer';
import { LabModel } from "../models/lab.model.js";
import clinicModel from "../models/clinic.model.js";
dotenv.config();
// 🔹 Generate Token
const generateToken = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};
const generateDoctorId = () => {
    return "DOC-" + Math.floor(100000 + Math.random() * 900000).toString();
};
//Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});
//send Email
const sendMail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            html
        });
    }
    catch (error) {
        console.log("Error sending email:", error);
    }
};
// 🔹 Admin Login
export const adminLogin = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    if (email === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD) {
        const token = generateToken("admin-id", email, "admin");
        return res.status(200).json({
            message: "Admin Login Successful",
            token,
            user: {
                email: process.env.ADMIN_ID,
                // password: process.env.ADMIN_PASSWORD,
            }
        });
    }
    return res.status(401).json({ message: "Invalid Credentials" });
};
// 🔹 Get all pending doctor requests
export const getPendingDoctors = async (req, res) => {
    try {
        const pendingDoctors = await doctorModel.find({ status: "pending" });
        return res.status(200).json(pendingDoctors);
    }
    catch (error) {
        console.error("Error fetching pending doctors:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
// 🔹 Approve Doctor
export const approveDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const generatedId = generateDoctorId();
        const doctor = await doctorModel.findByIdAndUpdate(id, { status: "approved", doctorId: generatedId }, { new: true });
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        await sendMail(doctor.email, "Doctor Registration Approved ✅", `<p>Dear Dr. ${doctor.fullName},</p>
       <p>Your registration is <b>Approved</b>.</p>
       <p><b>Doctor ID:</b> ${generatedId}</p>`);
        return res.status(200).json({ message: "Doctor approved ✅ & mail sent", doctor });
    }
    catch (error) {
        console.error("Error approving doctor:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
//  Reject Doctor
export const rejectDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await doctorModel.findByIdAndUpdate(id, { status: "rejected" }, { new: true });
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        await sendMail(doctor.email, "Doctor Registration Rejected ❌", `<p>Dear Dr. ${doctor.fullName},</p>
       <p>Your registration is <b>Rejected</b>. Please contact admin for details.</p>`);
        return res.status(200).json({ message: "Doctor rejected ❌", doctor });
    }
    catch (error) {
        console.error("Error rejecting doctor:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
//  Approve Lab
// ------------------ Generate Lab ID ------------------
const generateLabId = () => {
    return "LAB-" + Math.floor(100000 + Math.random() * 900000).toString();
};
// ------------------ Approve Lab ------------------
export const approveLab = async (req, res) => {
    try {
        const { id } = req.params;
        const generatedId = generateLabId();
        // ✅ Update lab to approved and assign labId
        const lab = await LabModel.findByIdAndUpdate(id, { status: "approved", labId: generatedId }, { new: true });
        if (!lab) {
            return res.status(404).json({ message: "Lab not found" });
        }
        // ✅ Send approval mail
        await sendMail(lab.email, "Lab Registration Approved ✅", `<p>Dear ${lab.name},</p>
       <p>Your registration has been <b>approved</b>.</p>
       <p><b>Lab ID:</b> ${generatedId}</p>
       <p>Welcome to our platform!</p>`);
        return res.status(200).json({
            message: "Lab approved ✅ & mail sent successfully",
            lab,
        });
    }
    catch (error) {
        console.error("Error approving lab:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
// ------------------ Reject Lab ------------------
export const rejectLab = async (req, res) => {
    try {
        const { id } = req.params;
        const lab = await LabModel.findByIdAndUpdate(id, { status: "rejected" }, { new: true });
        if (!lab) {
            return res.status(404).json({ message: "Lab not found" });
        }
        await sendMail(lab.email, "Lab Registration Rejected ❌", `<p>Dear ${lab.name},</p>
       <p>Your registration has been <b>rejected</b>. Please contact admin for more details.</p>`);
        return res.status(200).json({
            message: "Lab rejected ❌ & mail sent successfully",
            lab,
        });
    }
    catch (error) {
        console.error("Error rejecting lab:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
// ------------------ Get Pending Labs ------------------
export const getPendingLabs = async (req, res) => {
    try {
        // ✅ Fetch only pending labs
        const pendingLabs = await LabModel.find({ status: "pending" }).select("-password"); // exclude password
        return res.status(200).json(pendingLabs);
    }
    catch (error) {
        console.error("Error fetching pending labs:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
// clinic
export const getPendingClinics = async (req, res) => {
    try {
        const pendingClinics = await clinicModel.find({ status: "pending" });
        return res.status(200).json({
            message: "Pending Clinics retrieved",
            Clinics: pendingClinics
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "server error"
        });
    }
};
// CLINIC
// ------------------ Generate Staff ID ------------------
const generateClinicStaffId = () => {
    return "STAFF-" + Math.floor(100000 + Math.random() * 900000).toString();
};
// ------------------ Approve Clinic ------------------
export const approveClinic = async (req, res) => {
    try {
        const { id } = req.params;
        // ✅ Generate Staff ID
        const staffId = generateClinicStaffId();
        // ✅ Update clinic status to approved and set staffId
        const clinic = await clinicModel.findByIdAndUpdate(id, { status: "approved", staffId }, { new: true });
        if (!clinic) {
            return res.status(404).json({ message: "Clinic not found" });
        }
        // ✅ Send approval email to staff
        await sendMail(clinic.staffEmail, "Clinic Registration Approved ✅", `<p>Dear ${clinic.staffName},</p>
       <p>Your clinic registration has been <b>approved</b>.</p>
       <p><b>Staff ID:</b> ${staffId}</p>
       <p>Welcome to our platform!</p>`);
        return res.status(200).json({
            message: "Clinic approved ✅ & email sent successfully",
            clinic,
        });
    }
    catch (error) {
        console.error("Error approving clinic:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
// ------------------ Reject Clinic ------------------
export const rejectClinic = async (req, res) => {
    try {
        const { id } = req.params;
        const clinic = await clinicModel.findByIdAndUpdate(id, { status: "rejected" }, { new: true });
        if (!clinic) {
            return res.status(404).json({ message: "Clinic not found" });
        }
        await sendMail(clinic.email, "Clinic Registration Rejected ❌", `<p> ${clinic.clinicName},</p>
       <p>Your registration has been <b>rejected</b>. Please contact admin for more details.</p>`);
        return res.status(200).json({
            message: "Clinic rejected ❌ & mail sent successfully",
            clinic,
        });
    }
    catch (error) {
        console.error("Error rejecting clinic:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
//# sourceMappingURL=admin.controller.js.map
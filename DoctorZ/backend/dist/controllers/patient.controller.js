import mongoose from "mongoose";
import { json } from "stream/consumers";
import patientModel from "../models/patient.model.js";
import bcrypt from "bcryptjs";
import timeSlotsModel from "../models/timeSlots.model.js";
import { get } from "http";
import jwt from "jsonwebtoken";
import EMRModel from "../models/emr.model.js";
import Booking from "../models/booking.model.js";
import { FaV } from "react-icons/fa6";
const patientRegister = async (req, res) => {
    try {
        console.log("Received body:", req.body);
        const body = req.body;
        // const files = req.files as Express.Multer.File[];
        const photoFile = req.files && req.files.photo
            ? req.files.photo[0]
            : null;
        const medicalReports = req.files && req.files.medicalReports
            ? req.files.medicalReports
            : [];
        const profilePhotoUrl = photoFile ? `/uploads/${photoFile.filename}` : "";
        const { fullName, gender, dob, email, password, mobileNumber, aadhar, abhaId, doctorId, city, pincode, name, number, } = body;
        // EMR fields
        const allergies = JSON.parse(body.allergies || "[]");
        const diseases = JSON.parse(body.diseases || "[]");
        const pastSurgeries = JSON.parse(body.pastSurgeries || "[]");
        const currentMedications = JSON.parse(body.currentMedications || "[]");
        // Report URLs
        const reportUrls = medicalReports.map((file) => `/uploads/${file.filename}`);
        // Required validation
        if (!fullName || !gender || !dob || !mobileNumber || !aadhar) {
            return res.status(400).json({ message: "Required fields missing" });
        }
        // Check if email exists
        const existing = await patientModel.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create Patient
        const patient = await patientModel.create({
            fullName,
            gender,
            dob,
            email: email.toLowerCase(),
            password: hashedPassword,
            mobileNumber,
            aadhar,
            abhaId,
            address: { city, pincode },
            emergencyContact: { name, number },
            profilePhoto: profilePhotoUrl,
        });
        // Should we create EMR?
        const shouldCreateEMR = allergies.length > 0 ||
            diseases.length > 0 ||
            pastSurgeries.length > 0 ||
            currentMedications.length > 0 ||
            reportUrls.length > 0;
        if (shouldCreateEMR) {
            const emr = await EMRModel.create({
                name: fullName, // ✅ Store self name
                aadhar: aadhar, // ✅ Store patient's aadhar
                // ✅ Link to patient
                doctorId: doctorId || null,
                allergies,
                diseases,
                pastSurgeries,
                currentMedications,
                reports: reportUrls,
            });
            await patient.save();
        }
        return res.status(201).json({
            message: "Patient registered successfully",
            patient,
        });
    }
    catch (error) {
        console.log("Registration Error:", error);
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};
const patientLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login Email:", email);
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required." });
        }
        const patient = await patientModel.findOne({ email: email.toLowerCase() });
        console.log("Found Patient:", patient);
        if (!patient) {
            return res.status(400).json({ message: "Invalid Credentials." });
        }
        const isPasswordValid = await bcrypt.compare(password, patient.password);
        console.log(password);
        console.log(patient.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Password." });
        }
        // JWT Token create
        const token = jwt.sign({ id: patient._id, email: patient.email, name: patient.fullName, aadhar: patient.aadhar, mobileNumber: patient.mobileNumber, gender: patient.gender }, process.env.JWT_SECRET || "secret_key", { expiresIn: "1d" });
        return res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                _id: patient._id,
                email: patient.email,
                name: patient.fullName,
                gender: patient.gender,
                aadhar: patient.aadhar,
                contact: patient.mobileNumber,
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
        const user = await patientModel.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User Not found."
            });
        }
        return res.status(200).json({
            message: "User Found",
            user,
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
        const { doctorId } = req.params;
        if (!doctorId) {
            return res.status(400).json({
                message: "doctorId is required",
            });
        }
        // Find all slots for this doctor
        const slots = await timeSlotsModel.find({ doctorId });
        if (!slots || slots.length === 0) {
            return res.status(200).json({
                message: "No slots found for this doctor",
                availableData: [],
            });
        }
        const slotsByMonth = {};
        slots.forEach(slot => {
            const d = new Date(slot.date);
            const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
            if (!slotsByMonth[monthKey])
                slotsByMonth[monthKey] = [];
            slotsByMonth[monthKey].push(slot);
        });
        return res.status(200).json({
            message: "Available months and slots fetched successfully",
            availableMonths: slotsByMonth,
        });
    }
    catch (error) {
        console.error("Error fetching available slots", error);
        return res.status(500).json({
            message: "Failed to fetch available slots",
            error: error instanceof Error ? error.message : error,
        });
    }
};
// In your patient controller file
const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await patientModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updated)
            return res.status(404).json({ message: "User not found." });
        return res.status(200).json({ message: "Profile updated", user: updated });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong." });
    }
};
const getBookedDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Booking.find({ userId: id }).populate('doctorId');
        return res.status(200).json({
            message: "Doctors fetched successfully",
            doctor
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong."
        });
    }
};
//------------------------------------Add or Remove Favourite Doctor----------------------------------
const addFavouriteDoctor = async (req, res) => {
    try {
        const { id } = req.params; // patientId
        const { doctorId } = req.body;
        const patient = await patientModel.findById(id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found." });
        }
        if (!patient.favouriteDoctors) {
            patient.favouriteDoctors = [];
        }
        // ✅ Check if already favourite
        const isAlreadyFavourite = patient.favouriteDoctors?.includes(doctorId);
        if (isAlreadyFavourite) {
            // ✅ Remove from favourites
            patient.favouriteDoctors = patient.favouriteDoctors.filter((favId) => favId.toString() !== doctorId);
            await patient.save();
            return res.json({
                message: "Removed from favourites",
                isFavourite: false,
                favourites: patient.favouriteDoctors,
            });
        }
        // ✅ Add to favourites
        patient.favouriteDoctors?.push(new mongoose.Types.ObjectId(doctorId));
        await patient.save();
        return res.status(200).json({
            message: "Doctor added to favourites.",
            isFavourite: true, // ✅ Missing earlier!
            favourites: patient.favouriteDoctors,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong.",
            error,
        });
    }
};
const isFavouriteDoctor = async (req, res) => {
    try {
        const { patientId, doctorId } = req.params;
        const patient = await patientModel.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found." });
        }
        // ✅ Convert stored ObjectId → string
        const isFavourite = patient.favouriteDoctors?.some((favId) => favId.toString() === doctorId);
        return res.json({ isFavourite });
    }
    catch (error) {
        return res.status(500).json({ isFavourite: false });
    }
};
//------------------------------------Add or Remove Favourite Clinic----------------------------------
const addfavouriteClinic = async (req, res) => {
    try {
        const { id } = req.params; // patientId
        const { clinicId } = req.body;
        const patient = await patientModel.findById(id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found." });
        }
        // Check if already favourite
        if (!patient.favouriteClinics) {
            patient.favouriteClinics = [];
        }
        const isAlreadyFavourite = patient.favouriteClinics?.includes(clinicId);
        if (isAlreadyFavourite) {
            // Remove from favourites
            patient.favouriteClinics = patient.favouriteClinics.filter((favId) => favId.toString() !== clinicId);
            await patient.save();
            return res.json({
                message: "Removed from favourites",
                isFavourite: false,
                Favourites: patient.favouriteClinics,
            });
        }
        // Add to favourites
        patient.favouriteClinics?.push(new mongoose.Types.ObjectId(clinicId));
        await patient.save();
        return res.status(200).json({
            message: "Clinic added to favourites.",
            isFavourite: true,
            Favourites: patient.favouriteClinics,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong.",
            error,
        });
    }
};
const isFavouriteClinic = async (req, res) => {
    try {
        const { patientId, clinicId } = req.params;
        const patient = await patientModel.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found." });
        }
        // Convert stored ObjectId → string
        const isFavourite = patient.favouriteClinics?.some((favId) => favId.toString() === clinicId);
        return res.json({ isFavourite });
    }
    catch (error) {
        return res.status(500).json({ isFavourite: false });
    }
};
export default { patientRegister, patientLogin, getPatientById, deleteUser, getAvailableSlotsByDoctorId, updatePatient, getBookedDoctor, addFavouriteDoctor, isFavouriteDoctor, addfavouriteClinic, isFavouriteClinic };
//# sourceMappingURL=patient.controller.js.map
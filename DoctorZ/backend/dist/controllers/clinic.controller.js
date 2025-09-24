import bcrypt from "bcryptjs";
import clinicModel from "../models/clinic.model.js";
import doctorModel from "../models/doctor.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
console.log("MAIL_USER:", process.env.MAIL_USER);
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});
// export const clinicRegister = async (req: Request, res: Response) => {
//   try {
//     const {
//       clinicName,
//       clinicType,
//       specialities,
//       operatingHours,
//       licenseNo,
//       ownerAadhar,
//       ownerPan,
//       address,
//       state,
//       district,
//       pincode,
//       contact,
//       email,
//       staffEmail,
//       staffName,
//       staffPassword,
//       staffId
//     } = req.body;
//     if (!clinicName || !clinicType || !specialities || !licenseNo || !ownerAadhar) {
//       return res.status(400).json({ message: "All required fields must be filled." });
//     }
//     // Multer provides the uploaded file here
//     const registrationCertPath = req.file ? req.file.path : undefined;
//     console.log("Uploaded file path:", registrationCertPath);
//     const clinic = new clinicModel({
//       clinicName,
//       clinicType,
//       specialities: JSON.parse(specialities),//convert string into array of strings
//       operatingHours,
//       clinicLicenseNumber: licenseNo,
//       aadharNumber: Number(ownerAadhar),
//       panNumber: ownerPan,
//       address,
//       state,
//       district,
//       pincode: Number(pincode),
//       phone: contact,
//       email,
//       staffEmail,
//       staffName,
//       staffId,
//       staffPassword: await bcrypt.hash(staffPassword, 10), // Hash the password before saving
//       registrationCertificate: registrationCertPath, 
//     });
//     await clinic.save();
//     return res.status(201).json({ message: "Clinic Registered", clinic });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Something went wrong", error });
//   }
// };
export const clinicRegister = async (req, res) => {
    try {
        const { clinicName, clinicType, specialities, operatingHours, licenseNo, ownerAadhar, ownerPan, address, state, district, pincode, contact, email, staffEmail, staffName, staffPassword, staffId, } = req.body;
        if (!clinicName || !clinicType || !specialities || !licenseNo || !ownerAadhar) {
            return res.status(400).json({ message: "All required fields must be filled." });
        }
        // Multer provides the uploaded file here
        const registrationCertPath = req.file ? req.file.path : undefined;
        const clinic = new clinicModel({
            clinicName,
            clinicType,
            specialities: JSON.parse(specialities),
            operatingHours,
            clinicLicenseNumber: licenseNo,
            aadharNumber: Number(ownerAadhar),
            panNumber: ownerPan,
            address,
            state,
            district,
            pincode: Number(pincode),
            phone: contact,
            email,
            staffEmail,
            staffName,
            staffId,
            staffPassword: await bcrypt.hash(staffPassword, 10),
            registrationCertificate: registrationCertPath,
        });
        await clinic.save();
        // 📧 Send staff ID via email after saving
        try {
            await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: staffEmail,
                subject: "Your Staff ID for Clinic Registration",
                html: `
          <p>Hi <b>${staffName}</b>,</p>
          <p>Your staff account has been created successfully!</p>
          <p><strong>Staff ID:</strong> ${staffId}</p>
          <p>Please use this ID along with your password to login.</p>
          <br/>
          <p>Thanks,<br/>Clinic Management Team</p>
        `,
            });
            console.log("✅ Staff ID email sent to:", staffEmail);
        }
        catch (mailErr) {
            console.error("❌ Failed to send email:", mailErr);
        }
        return res.status(201).json({ message: "Clinic Registered", clinic });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong", error });
    }
};
// // ---------------- Update Clinic ----------------
export const updateClinic = async (req, res) => {
    try {
        const { id } = req.params;
        const { clinicName, clinicType, specialities, operatingHours, clinicLicenseNumber, aadharNumber, panNumber, address, district, pincode, state, } = req.body;
        const updateData = {
            clinicName,
            clinicType,
            specialities: JSON.parse(specialities),
            operatingHours,
            clinicLicenseNumber,
            aadharNumber: Number(aadharNumber),
            panNumber,
            address,
            district,
            state,
            pincode: Number(pincode),
        };
        // Multer file handling
        if (req.file) {
            updateData.registrationCertificate = req.file.path;
        }
        const updatedClinic = await clinicModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedClinic) {
            return res.status(404).json({ message: "Clinic not found" });
        }
        return res.status(200).json({ message: "Clinic updated", clinic: updatedClinic });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong", error });
    }
};
export const deleteClinic = async (req, res) => {
    try {
        const { id } = req.params;
        await clinicModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Clinic deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};
export const searchClinicAndDoctor = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || typeof q !== "string") {
            return res.status(400).json({ message: "Search query is required" });
        }
        const query = q.trim();
        if (!query) {
            return res.status(400).json({ message: "Search query is empty" });
        }
        // Try doctor first
        const doctors = await doctorModel.find({
            $or: [
                { fullName: { $regex: query, $options: "i" } },
                { specialization: { $regex: query, $options: "i" } },
            ],
        });
        if (doctors.length > 0) {
            // If any doctors found, return doctors only
            return res.status(200).json({ type: "doctor", results: doctors });
        }
        // Otherwise, try clinics
        const clinics = await clinicModel.find({
            $or: [
                { clinicName: { $regex: query, $options: "i" } }
            ],
        });
        if (clinics.length > 0) {
            return res.status(200).json({ type: "clinic", results: clinics });
        }
        return res.status(404).json({ message: "No doctors or clinics found" });
    }
    catch (error) {
        console.error("Search error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const getAllClinic = async (req, res) => {
    try {
        const clinic = await clinicModel.find();
        return res.status(200).json({
            clinic: clinic,
            message: "successfully fetched all clinic"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};
//# sourceMappingURL=clinic.controller.js.map
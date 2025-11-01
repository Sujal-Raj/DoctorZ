
import bcrypt from "bcryptjs";
import { transporter } from "../utils/email.js";
import nodemailer from "nodemailer";
import type {Response,Request} from "express";
import doctorModel from '../models/doctor.model.js';
import Booking from '../models/booking.model.js';
import jwt from "jsonwebtoken";
import clinicModel from "../models/clinic.model.js";

interface MulterFiles {
  [fieldname: string]: Express.Multer.File[];
}

interface Params {
  doctorId: string; // this ensures `req.params.doctorId` is typed as string
}


const doctorRegister = async (req: Request, res: Response) => {
  try {
    console.log("Text fields:", req.body);
    console.log("Files:", req.files);

    const files = req.files as MulterFiles | undefined;

    // Convert data types
    const experience = Number(req.body.experience);
    const consultationFee = Number(req.body.fees);
    const Aadhar = Number(req.body.aadhar);
    const dob = new Date(req.body.dob);
    const MobileNo = req.body.mobileNo;
    const email = req.body.email;

    // Handle uploaded files
    const degreeCert = files?.["degreeCert"]?.[0]?.filename || "";
    const photo = files?.["photo"]?.[0]?.filename || "";
    const signature = files?.["signature"]?.[0]?.filename || "";

    if (!req.body.password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const clinicId = req.body.clinicId;

    const doctor = new doctorModel({
      fullName: req.body.fullName,
      password: hashedPassword,
      gender: req.body.gender,
      dob,
      MobileNo,
      MedicalRegistrationNumber: req.body.regNumber,
      specialization: req.body.specialization || "",
      qualification: req.body.qualification,
      experience,
      consultationFee,
      language: req.body.languages || "",
      Aadhar,
      DegreeCertificate: degreeCert,
      photo,
      signature,
      email,
      clinic: clinicId,
      status: "pending",
    });

    // Add doctor reference to clinic
    if (clinicId) {
      await clinicModel.findByIdAndUpdate(clinicId, {
        $push: { doctors: doctor._id },
      });
    }

    await doctor.save();
    return res.status(201).json({ message: "Doctor registered", doctor });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Registration failed", error });
  }
};

// ==========================
// Doctor Login
// ==========================
const doctorLogin = async (req: Request, res: Response) => {
  try {
    console.log("Login request body:", req.body);

    const { doctorId, password } = req.body;

    if (!doctorId || !password) {
      return res.status(400).json({ message: "doctorId and password are required" });
    }

    const doctor = await doctorModel.findOne({ doctorId });
    if (!doctor) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        id: doctor._id,
        doctorId: doctor.doctorId,
        email: doctor.email,
        role: "doctor",
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login Successful",
      token,
      doctor: {
        _id: doctor._id,
        doctorId: doctor.doctorId,
        fullName: doctor.fullName,
        email: doctor.email,
      },
    });
  } catch (error) {
    console.error("Doctor login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// ==========================
// Get Doctor by ID
// ==========================
const getDoctorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const doctor = await doctorModel.findById(id);
    if (!doctor) {
      return res.status(400).json({ message: "Doctor not found" });
    }

    return res.status(200).json({ message: "Doctor found", doctor });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return res.status(500).json({ message: "Failed to fetch doctor" });
  }
};

// ==========================
// Get All Approved Doctors
// ==========================
const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    return res.status(200).json({ message: "Approved doctors fetched successfully", doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res.status(500).json({ message: "Failed to fetch doctors" });
  }
};

// ==========================
// Update Doctor ID and Password
// ==========================
const updateDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { doctorId, password } = req.body;

    if (!doctorId || !password) {
      return res.status(400).json({ message: "doctorId and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      id,
      { doctorId, password: hashedPassword },
      { new: true, runValidators: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Send confirmation email
    if (updatedDoctor.email) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: updatedDoctor.email,
        subject: "Your Doctor Login Details Updated",
        text: `
Your login credentials have been updated successfully.

Doctor ID: ${doctorId}
Password: (hidden for security)

If you did not request this change, please contact support immediately.

Regards,
Your Hospital Admin Team
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }

    return res.status(200).json({
      message: "Doctor ID and password updated successfully.",
      updatedDoctor,
    });
  } catch (error: any) {
    console.error("Error updating doctor:", error.message || error);
    return res.status(500).json({ message: "Failed to update doctor" });
  }
};

// ==========================
// Get Doctors by Clinic ID
// ==========================
const getClinicDoctors = async (req: Request, res: Response) => {
  try {
    const { clinicId } = req.params;
    const doctors = await doctorModel.find({ clinic: clinicId, status: "approved" });

    return res.status(200).json({
      message: "Doctors fetched successfully",
      doctors,
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res.status(500).json({ message: "Failed to fetch doctors" });
  }
};

// ==========================
// Get Today's Booked Appointments
// ==========================
export const getTodaysBookedAppointments = async (req: Request, res: Response) => {
  try {
    const doctorId = req.params.doctorId;

    const now = new Date();
    const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
    const endOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));

    const bookedAppointments = await Booking.find({
      doctorId,
      datetime: { $gte: startOfDay, $lte: endOfDay },
      status: "booked",
    });

    res.status(200).json(bookedAppointments);
  } catch (error) {
    console.error("Error fetching today's booked appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



export const getTotalPatients = async (req: Request, res: Response) => {
  try {
    const doctorId = req.params.doctorId;

    const totalPatients = await Booking.countDocuments({
      doctorId,
      status: "booked",
    });

    res.status(200).json({ totalPatients });
  } catch (error) {
    console.error("Error fetching total patients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteDoctor = async(req:Request,res:Response)=>{
    try{
        const {id} = req.params;

        const deletedoctor = await doctorModel.findByIdAndDelete(id);

        if(!deleteDoctor){
             return res.status(400).json({
                message:"Doctor not found"
            })
        }

        return res.status(202).json({
            message:"doctor deleted successfully",deleteDoctor
        })

    }
    catch(error){
        console.error("Error deleting doctor",error);
        return res.status(500).json({
            message:"failed to delete doctor"
        })
    }
}

export default {getAllDoctors,doctorRegister,getDoctorById,deleteDoctor,updateDoctor,getClinicDoctors,doctorLogin ,getTodaysBookedAppointments ,getTotalPatients};

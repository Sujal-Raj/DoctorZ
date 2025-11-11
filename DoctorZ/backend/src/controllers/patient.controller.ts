import mongoose from "mongoose";
import type { Request, Response } from "express";
import { json } from "stream/consumers";
import patientModel from "../models/patient.model.js";
import bcrypt from "bcryptjs";
import timeSlotsModel from "../models/timeSlots.model.js";
import { get } from "http";
import jwt from "jsonwebtoken";
import EMRModel from "../models/emr.model.js";
import Booking from "../models/booking.model.js";


const patientRegister = async (req: Request, res: Response) => {
  try {
    console.log("Received body:", req.body);
    const body = req.body;

    const files = req.files as Express.Multer.File[];

    const {
      fullName,
      gender,
      dob,
      email,
      password,
      mobileNumber,
      aadhar,
      abhaId,
      doctorId,
      city,
      pincode,
      name,
      number,  
     
    } = body;

    // EMR fields
    const allergies = JSON.parse(body.allergies || "[]");
    const diseases = JSON.parse(body.diseases || "[]");
    const pastSurgeries = JSON.parse(body.pastSurgeries || "[]");
    const currentMedications = JSON.parse(body.currentMedications || "[]");

    // Report URLs
    const reportUrls =
      files?.length > 0
        ? files.map((file) => `/uploads/${file.filename}`)
        : [];

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
              
    });

    // Should we create EMR?
    const shouldCreateEMR =
      allergies.length > 0 ||
      diseases.length > 0 ||
      pastSurgeries.length > 0 ||
      currentMedications.length > 0 ||
      reportUrls.length > 0;

    if (shouldCreateEMR) {
      const emr = await EMRModel.create({
        name: fullName,          // ✅ Store self name
        aadhar: aadhar,          // ✅ Store patient's aadhar
  
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

  } catch (error) {
    console.log("Registration Error:", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};



const patientLogin = async(req: Request, res: Response)=>{
  try {
    const { email, password } = req.body;
    console.log("Login Email:", email);



    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required." });
    }

    const patient = await patientModel.findOne({ email:email.toLowerCase() });
    console.log("Found Patient:", patient);
    if (!patient) {
      
      return res.status(400).json({ message: "Invalid Credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, patient.password);
    console.log(password)
    console.log(patient.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password." });
    }

    // JWT Token create
    const token = jwt.sign(
      { id: patient._id, email: patient.email,name:patient.fullName },
      process.env.JWT_SECRET || "secret_key", 
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        _id: patient._id,
        email: patient.email,
        name:patient.fullName,
         gender:patient.gender,
        aadhar:patient.aadhar,
        contact:patient.mobileNumber,
          
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const getPatientById = async (req:Request,res:Response)=>{
    try {
        const {id} = req.params;
       

        const user = await patientModel.findById(id);

        if(!user){
           return res.status(404).json({
                message:"User Not found."
            })
        }

        return res.status(200).json({
            message:"User Found",
            user,
            
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong."
        })
    }
}


const deleteUser = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        
        const deleteUser = patientModel.findByIdAndDelete(id);

        if(!deleteUser){
            return res.status(400).json({
                message:"User Not Found."
            })
        }

        return res.status(200).json({
            message:"User Deleted."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong."
        })
    }
}


const getAvailableSlotsByDoctorId = async (req: Request, res: Response) => {
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

    
    const slotsByMonth: Record<string, any[]> = {};

    slots.forEach(slot => {
      const d = new Date(slot.date);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (!slotsByMonth[monthKey]) slotsByMonth[monthKey] = [];
      slotsByMonth[monthKey].push(slot);
    });

    return res.status(200).json({
      message: "Available months and slots fetched successfully",
      availableMonths: slotsByMonth,
    });
  } catch (error) {
    console.error("Error fetching available slots", error);
    return res.status(500).json({
      message: "Failed to fetch available slots",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// In your patient controller file
const updatePatient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await patientModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "User not found." });

    return res.status(200).json({ message: "Profile updated", user: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong." });
  }
}

const getBookedDoctor =async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        const doctor = await Booking.find({userId:id}).populate('doctorId');

        return res.status(200).json({
            message:"Doctors fetched successfully",
            doctor
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            message: "Something went wrong." 
        });
    }
}

export default {patientRegister,patientLogin,getPatientById,deleteUser,getAvailableSlotsByDoctorId,updatePatient,getBookedDoctor};

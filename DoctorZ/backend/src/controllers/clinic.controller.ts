
import type {Request,Response} from "express";
import bcrypt  from "bcryptjs";
import clinicModel from "../models/clinic.model.js";
import type { IClinic } from "../models/clinic.model.js";
import  doctorModel from "../models/doctor.model.js";
import nodemailer from "nodemailer";
import bookingModel from "../models/booking.model.js";
import patientModel from "../models/patient.model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
console.log("MAIL_USER:", process.env.MAIL_USER);



// ---------------- Clinic Registration ----------------

export const clinicRegister = async (req: Request, res: Response) => {
  console.log("➡️ Received form submission");

    console.log("🧾 req.body:", req.body);
    console.log("📎 req.file:", req.file);
  try {
    const {
      clinicName,
      clinicType,
      specialities,
      operatingHours,
      licenseNo,
      ownerAadhar,
      ownerPan,
      address,
      state,
      district,
      pincode,
      contact,
      email,
      staffEmail,
      staffName,
      staffPassword,
      staffId,
    } = req.body;

    if (!clinicName || !clinicType || !specialities || !licenseNo || !ownerAadhar) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    // Multer provides the uploaded file here
    const registrationCertPath = req.file ? req.file.filename : undefined;

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

    // console.log(clinic);
    await clinic.save();

   

    return res.status(201).json({ message: "Clinic Registered", clinic });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};




// ---------------- Clinic Login ----------------

export const clinicLogin = async (req: Request, res: Response) => {
  try {
    const { staffId, staffPassword } = req.body;

    if (!staffId || !staffPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const clinic = await clinicModel.findOne({ staffId });
    if (!clinic) {
      return res.status(404).json({
        message: "Clinic not found",
      });
    }

    const isMatch = await bcrypt.compare(staffPassword, clinic.staffPassword);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: clinic._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // ✅ Just return the token in the response (no cookie)
    return res.status(200).json({
      message: "Login successful",
     jwtToken: token,
      clinic: {
        id: clinic._id,
        staffId: clinic.staffId,
        staffName: clinic.staffName,
        staffEmail: clinic.staffEmail,
        clinicName: clinic.clinicName,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
// // ---------------- Update Clinic ----------------

export const updateClinic = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      clinicName,
      clinicType,
      specialities,
      operatingHours,
      clinicLicenseNumber,
      aadharNumber,
      panNumber,
      address,
      district,
      pincode,
      state,
      phone,
      email,
      staffEmail,
      staffPassword,
      staffName,
      staffId,
      doctors,
    } = req.body;

    const updateData: Partial<IClinic> = {
      clinicName,
      clinicType,
      specialities: Array.isArray(specialities)
        ? specialities
        : typeof specialities === "string"
        ? specialities.split(",").map((s) => s.trim())
        : [],
      operatingHours,
      clinicLicenseNumber,
      aadharNumber: Number(aadharNumber),
      panNumber,
      address,
      district,
      state,
      pincode: Number(pincode),
      phone,
      email,
      staffEmail,
      staffName,
      staffId,
      doctors,
    };

    // 🔒 Hash new password if provided
    if (staffPassword && staffPassword.trim() !== "") {
      const hashedPassword = await bcrypt.hash(staffPassword, 10);
      updateData.staffPassword = hashedPassword;
    }

    // Optional file upload handling
    if (req.file) {
      updateData.registrationCertificate = req.file.path;
    }

    const updatedClinic = await clinicModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedClinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    return res
      .status(200)
      .json({ message: "Clinic updated", clinic: updatedClinic });
  } catch (error) {
    console.error("Error updating clinic:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};





// ---------------- Delete Clinic ----------------


export const deleteClinic=async(req:Request,res:Response)=>{
  try{
    const {id}=req.params;
await clinicModel.findByIdAndDelete(id);
    return res.status(200).json({
      message:"Clinic deleted successfully"
    })
  }catch(error){
    return res.status(500).json({
      message:"Something went wrong"
    })
  }
}



// ---------------- Search Clinic and Doctor ----------------

export const searchClinicAndDoctor = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};



// ---------------- Get All Clinics ----------------

export const getAllClinic=async(req:Request,res:Response)=>{
   try{
      const clinic=await clinicModel.find();
      return res.status(200).json({
        clinic:clinic,
        message:"successfully fetched all clinic"
      })
   }
   catch(error){
   return res.status(500).json({
    message:"Something went wrong"
   })
   }
}


export const getClinicById = async(req:Request,res:Response)=>{
   try{
      const {id} = req.params;

      const clinic = await clinicModel.findById(id);

      if(!clinic){
        return res.status(404).json({
          message:"Clinic not found"
        })
      }

      return res.status(200).json({
        message:"Clinic found", 
        clinic:clinic
      })
   }
   catch(error){
    console.error("error in getClinicById",error);
    return res.status(500).json({
      message:"Something went wrong"
    })
   }
}

// ---------------- Get All Clinic Patients ----------------
export const getAllClinicPatients = async (req: Request, res: Response) => {
  try {
    const { clinicId } = req.params;

    if (!clinicId) {
      return res.status(400).json({ message: "Clinic ID is required" });
    }

    // ✅ Step 1: Find all doctors linked to this clinic
    const doctors = await doctorModel
      .find({ clinic: clinicId })
      .select("_id fullName specialization");

    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found for this clinic" });
    }

    const doctorIds = doctors.map((d) => d._id);

    // ✅ Step 2: Fetch all bookings for those doctors
    const bookings = await bookingModel
      .find({ doctorId: { $in: doctorIds } })
      .populate("doctorId", "fullName specialization");

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No patients found for this clinic" });
    }

    // ✅ Step 3: Build patient list using the `patient` object
    const patients = bookings.map((b) => {
      const doctor: any = b.doctorId;
      const patient: any = b.patient; // 👈 comes from embedded field

      return {
        patientName: patient?.name,
        age: patient?.age,
        gender: patient?.gender,
        contact: patient?.contact,
        aadhar: patient?.aadhar,
        appointedTo: `Dr. ${doctor?.fullName}`,
        specialization: doctor?.specialization,
        datetime: b.datetime,
        mode: b.mode,
        fees: b.fees,
      };
    });

    return res.status(200).json({
      message: "All clinic patients fetched successfully",
      clinicId,
      totalPatients: patients.length,
      patients,
    });
  } catch (error) {
    console.error("Error fetching clinic patients:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

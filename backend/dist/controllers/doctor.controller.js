import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { json } from "stream/consumers";
import doctorModel from '../models/doctor.model.js';
// const doctorRegister = async (req:Request,res:Response)=>{
//     try{
//         console.log("Request Body:", req.body);
//         const{fullName,password,gender,dob,MobileNo,MedicalRegistrationNumber,specialization,qualification,DegreeCertificate,experience,consultationFee,language,Aadhar,signature,photo} = req.body;
//         if(!fullName ||!password||!gender ||!dob|| !MobileNo ){
//              return res.status(400).json(
//                 console.log("All required fields must be filled.")
//          )
//         }
//          const hashedPassword = await bcrypt.hash(password,10);
//          const doctor = new doctorModel({
//             fullName,
//             password:hashedPassword,
//             gender,
//             dob,
//             MobileNo,
//             MedicalRegistrationNumber,
//             specialization,
//             qualification,
//             experience,
//             DegreeCertificate,
//             consultationFee,
//             language,
//             Aadhar,
//             signature,
//             photo,
//          })
//          await doctor.save();
//          return res.status(201).json({
//            message:"Doctor registered"
//          })
//     }
//     catch(error){
//         console.log("error",error);
//         return res.status(500).json({
//            message:"Registration failed"
//     })
//  }
// }
const doctorRegister = async (req, res) => {
    try {
        console.log('Text fields:', req.body);
        console.log('Files:', req.files);
        // Cast req.files for TypeScript
        const files = req.files;
        // Convert numbers/dates
        const experience = Number(req.body.experience);
        const consultationFee = Number(req.body.fees);
        const Aadhar = Number(req.body.aadhar);
        const dob = new Date(req.body.dob);
        const MobileNo = req.body.mobileNo;
        // Handle files
        const degreeCert = files?.['degreeCert']?.[0]?.filename || '';
        const photo = files?.['photo']?.[0]?.filename || '';
        const signature = files?.['signature']?.[0]?.filename || '';
        // Optional: generate temporary password if not in form
        const password = req.body.password || 'Temp@123';
        const hashedPassword = await bcrypt.hash(password, 10);
        const doctor = new doctorModel({
            fullName: req.body.fullName,
            password: hashedPassword,
            gender: req.body.gender,
            dob,
            MobileNo,
            MedicalRegistrationNumber: req.body.regNumber,
            specialization: req.body.specialization || '',
            qualification: req.body.qualification,
            experience,
            consultationFee,
            language: req.body.languages || '',
            Aadhar,
            DegreeCertificate: degreeCert,
            photo,
            signature,
        });
        await doctor.save();
        return res.status(201).json({ message: 'Doctor registered', doctor });
    }
    catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Registration failed', error });
    }
};
// const doctorRegister = async (req: Request, res: Response) => {
//   try {
//     console.log('req.body:', req.body);
//     console.log('req.files:', req.files);
//     return res.status(200).json({ message: 'Reached controller', body: req.body, files: req.files });
//   } catch (error) {
//     console.error('Error:', error);
//     return res.status(500).json({ message: 'Registration failed', error });
//   }
// };
const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const doctor = await doctorModel.findById(id);
        if (!doctor) {
            return res.status(400).json({
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
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find();
        return res.status(200).json({
            message: "Doctors fetched successfully", doctors
        });
    }
    catch (error) {
        console.error("Error fetching doctors", error);
        return res.status(500).json({
            message: "failed to fetch doctors"
        });
    }
};
const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const deltedoctor = await doctorModel.findByIdAndDelete(id);
        if (!deleteDoctor) {
            return res.status(400).json({
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
        const updateDoctor = await doctorModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }); // new:true => updated document return hoga
        if (!updateDoctor) {
            return res.status(400).json({
                message: "doctor not found"
            });
        }
        return res.status(201).json({
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
export default { getAllDoctors, doctorRegister, getDoctorById, deleteDoctor, updateDoctor };
//# sourceMappingURL=doctor.controller.js.map
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import type { Request,Response } from 'express';

import doctorModel from '../models/doctor.model.js';
import jwt from "jsonwebtoken";

interface MulterFiles {
  [fieldname: string]: Express.Multer.File[];
}



const doctorRegister = async (req: Request, res: Response) => {
  try {
    console.log('Text fields:', req.body);
    console.log('Files:', req.files);

    // Cast req.files for TypeScript
    const files = req.files as MulterFiles | undefined;

    // Convert numbers/dates
    const experience = Number(req.body.experience);
    const consultationFee = Number(req.body.fees);

    const Aadhar = Number(req.body.aadhar);
    const dob = new Date(req.body.dob);
const MobileNo = req.body.mobileNo;
const email = req.body.email;

    // Handle files
    const degreeCert = files?.['degreeCert']?.[0]?.filename || '';
    const photo = files?.['photo']?.[0]?.filename || '';
    const signature = files?.['signature']?.[0]?.filename || '';

    
    if(!req.body.password){
      return res.status(400).json({ message: "Password is required" });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

     const clinicId = req.body.clinicId;


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
      email,
      clinic:clinicId,
         status: "pending",
    });

    await doctor.save();

    return res.status(201).json({ message: 'Doctor registered', doctor });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Registration failed', error });
  }
};


// Login Doctor
const doctorLogin = async(req:Request, res:Response)=>{
  try{
     console.log("Login request body:", req.body);
    const {doctorId , password} = req.body;
    

    if(!doctorId || !password){
      return res.status(400).json({message:"doctorId and password are required"});
    }

    const doctor = await doctorModel.findOne({doctorId});
    if(!doctor){
      return res.status(400).json({message:"Invalid Credentials"});
    }

    //password verify
    const isMatch = await bcrypt.compare(password,doctor.password);
    if(!isMatch){
      return res.status(400).json({message:"Invalid Credentials"});
    }

    const token = jwt.sign(
      {
      id: doctor._id,
      doctorId: doctor.doctorId,
      email: doctor.email,
      role: "doctor",
    },
    process.env.JWT_SECRET as string,
    {expiresIn:"7d"}
    );

    return res.status(200).json({
      message:"Login Successful",
      token,
      doctor:{
        _id:doctor._id,
        doctorId:doctor.doctorId,
        fullName: doctor.fullName,
        email: doctor.email,
      }
    });
  }
  catch (error) {
    console.error("Doctor login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}


const getDoctorById = async(req:Request , res:Response)=>{
    try{
        const {id} = req.params;
        console.log(id);

        const doctor = await doctorModel.findById(id);

        if(!doctor){
            return res.status(400).json({
                message:'doctor not found'
            })
        }

        return res.status(200).json({
            message:"doctor found",doctor
        })
    }
    catch (error){
        console.error("Error fetching doctor", error);
        return res.status(500).json({
            message:"failed to fetch doctor"
        })

    }
};


const getAllDoctors=async(req:Request,
    res:Response)=>{
        try{
            const doctors = await doctorModel.find();

            return res.status(200).json({
                message:"Doctors fetched successfully",doctors
            })
        }
        catch(error){
            console.error("Error fetching doctors",error);
            return res.status(500).json({
                message:"failed to fetch doctors"
            })
        }
    }

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

const updateDoctor =async(req:Request,res:Response)=>{
    try{

        const {id} = req.params;

        const updateDoctor = await doctorModel.findByIdAndUpdate(id,req.body, 
            { new: true, runValidators: true }); // new:true => updated document return hoga

        if(!updateDoctor){
            return res.status(400).json({
                message:"doctor not found"
            })
        }

        return res.status(201).json({
            message:"doctor updated successfully",updateDoctor
        })
    }
    catch(error){
        console.error("Error updating doctor ",error);
        return res.status(500).json({
            message:"failed to updated doctor"
        })
    }
}


 const getClinicDoctors=async(req:Request,res:Response)=>{
    try{
        const {clinicId}=req.params;
        const doctors = await doctorModel.find({clinic:clinicId});
        return res.status(200).json({
            message:"Doctors fetched successfully",doctors
        })

    }
    catch(error){
        console.error("Error fetching doctors",error);
        return res.status(500).json({
            message:"failed to fetch doctors"
        })
    }
    
}


export default {getAllDoctors,doctorRegister,getDoctorById,deleteDoctor,updateDoctor,getClinicDoctors,doctorLogin};
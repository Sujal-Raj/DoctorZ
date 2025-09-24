import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import type { Request,Response } from 'express';
import {json} from "stream/consumers";
import doctorModel from '../models/doctor.model.js';


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

    // Handle files
    const degreeCert = files?.['degreeCert']?.[0]?.filename || '';
    const photo = files?.['photo']?.[0]?.filename || '';
    const signature = files?.['signature']?.[0]?.filename || '';

  


    const doctor = new doctorModel({
      fullName: req.body.fullName,
     
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

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Registration failed', error });
  }
};



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

        const deltedoctor = await doctorModel.findByIdAndDelete(id);

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

export default {getAllDoctors,doctorRegister,getDoctorById,deleteDoctor,updateDoctor};
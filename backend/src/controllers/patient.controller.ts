import mongoose from "mongoose";
import type { Request, Response } from "express";
import { json } from "stream/consumers";
import patientModel from "../models/patient.model.js";

const patientRegister = async (req:Request,res:Response)=>{
    try {
        const body = req.body;
        // console.log(body);
        const {fullName,gender,dob,mobileNumber,Aadhar,abhaId} = body;
        const {city,pincode} = body.address;
        const {name,number}= body.emergencyContact;

        if(!fullName||!gender||!dob||!mobileNumber||!Aadhar){
            return res.status(400).json(
                console.log("All required fields must be filled.")
            )
        }

        const patient = new patientModel({
            fullName,
            gender,
            dob,
            mobileNumber,
            Aadhar,
            abhaId,
            address:{
                city,
                pincode
            },
            emergencyContact:{
                name,
                number
            }
        })

        await patient.save();

        return res.status(201).json({
            message:"Patient Registered"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong"
        })
    }
}


const getPatientById = async (req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        // console.log(id)

        const user = await patientModel.findById(id);

        if(!user){
           return res.status(404).json({
                message:"User Not found."
            })
        }

        return res.status(200).json({
            message:"User Found"
        })
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

export default {patientRegister,getPatientById,deleteUser};
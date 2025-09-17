import mongoose from 'mongoose';
import {Types} from 'mongoose';


export interface IDoctor extends Document{
    fullName: string,
    password:string,
    gender:string,
    dob:Date,
    MobileNo:number,
    MedicalRegistrationNumber:number,
    specialization:string,
    qualification:string,
    DegreeCertificate:string,
    experience:number,
    consultationFee: number,
    language:string,
    Aadhar:number,
    signature:string,
    photo:string,
    clinic:Types.ObjectId[];
}


const doctorSchema = new mongoose.Schema<IDoctor>({
    fullName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true,
    },
    MobileNo:{
        type:Number,
        required:true,
    },
    MedicalRegistrationNumber:{
        type:Number,
        required:true,
    },
    specialization:{
        type:String,
        required:true,
    },
    qualification:{
        type:String,
        required:true,
    },
    DegreeCertificate:{
        type:String,
        // required:true,
    },
    experience:{
        type:Number,
        required:true,
    },
    consultationFee:{
        type:Number,
        required:true,
    },
    language:{
        type:String,
        required:true,
    },
    Aadhar:{
        type:Number,
        required:true,
    },
    signature:{
        type:String,
        // required:true,
    },
    photo:{
        type:String,
        // required:true,
    },
    clinic:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Clinic',
    }]

});

const doctorModel = mongoose.model("Doctor",doctorSchema,"Doctor");

export default doctorModel;
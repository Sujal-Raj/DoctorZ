import mongoose from 'mongoose';
import {Types} from 'mongoose';


export interface IDoctor extends Document{
      doctorId:string;
    fullName: string,
    password:string,
     email:string;
    gender:string,
    dob:Date,
    MobileNo:string,
    MedicalRegistrationNumber:string,
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
       status?: string;
}


const doctorSchema = new mongoose.Schema<IDoctor>({
      doctorId:{type:String,default:null,required:false},
    fullName:{
        type:String,
        required:true
    },
   
    gender:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true,
    },
      password:{type:String,required:true},
      email:{type:String,required:true},
    MobileNo:{
        type:String,
        required:true,
    },
    MedicalRegistrationNumber:{
        type:String,
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
    }],
      status: { type: String, default: "pending" }

});

const doctorModel = mongoose.model("Doctor",doctorSchema,"Doctor");

export default doctorModel;
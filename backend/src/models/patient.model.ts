import mongoose from "mongoose";

export interface IPatient extends Document {
  fullName: string;
  gender:string;
  dob:Date;
  email:string;
  password:string;
  mobileNumber:number;
  Aadhar:number;
  address: {
    city: string;
    pincode: number;
  };
  abhaId:string;
  emergencyContact:{
    name:string;
    number:number;
  }
}


const patientSchema = new mongoose.Schema<IPatient>({
    fullName:{
        type:String,
        required: true
    },
    gender:{
        type:String,
        required:true,
    },
    dob:{
        type:Date,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true,
    },
    Aadhar:{
        type:Number,
    },
    address:{
        city:{
            type:String,
            require:true,
        },
        pincode:{
            type:Number,

        }
    },
    abhaId:{
        type:String,
    },
    emergencyContact:{
        name:{
            type:String,
        },
        number:{
            type:Number
        }
    }
});

const patientModel = mongoose.model("Patient",patientSchema,"Patient");

export default patientModel;
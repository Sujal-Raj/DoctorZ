import mongoose from "mongoose";

export interface IPatient extends Document {
  fullName: string;
  gender:string;
  dob:Date;
  email:string;
  password:string;
  mobileNumber:number;
  aadhar:number;
  address: {
    city: string;
    pincode: number;
  };
  abhaId:string;
  emergencyContact:{
    name:string;
    number:number;
  },
    emrs: {
    name: string;
    aadhar: number;
    relation: string;
    emrId: mongoose.Types.ObjectId;
  }[];

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
    aadhar:{
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
    },
     emrs: [
      {
        name: { type: String },
        aadhar: { type: Number },
        relation: { type: String },

        emrId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "EMR",
        },
      },
    ],
   
   
  
},
{timestamps:true}
);

const patientModel = mongoose.model("Patient",patientSchema,"Patient");

export default patientModel;
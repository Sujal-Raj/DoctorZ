import mongoose, { Document } from "mongoose";

export interface IClinic extends Document {
  clinicName: string;
  clinicType: "Private" | "Government";
  specialities: string[];
  

  address:string,
  state: string;
  district: string;
  pincode: number;

  
  phone: string;
  email: string;

  doctors: mongoose.Types.ObjectId[];
  operatingHours: string;
  clinicLicenseNumber: string;
  registrationCertificate?: string;

  aadharNumber: number;
  panNumber: string;

  // staffName: string;
  // staffEmail: string;
  // staffPassword: string;
}

const clinicSchema = new mongoose.Schema<IClinic>({
  clinicName: {
    type: String,
    required: true,
  },
  clinicType: {
    type: String,
    enum: ["Private", "Government"],
    required: true,
  },
  specialities: { type: [String], required: true },

  // flat address fields
  address:{type:String,required:true},
  state: { type: String, required: true },
  district: { type: String, required: true },
  pincode: { type: Number, required: true },

  // flat contact fields
  phone: { type: String, required: true },
  email: { type: String, required: true },

  doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
  ],
  clinicLicenseNumber: { type: String, required: true },
  registrationCertificate: { type: String },

  panNumber: { type: String, required: true },
  operatingHours: { type: String, required: true },

  // staffName: {
  //   type: String,
  //   required: true,
  // },
  // staffEmail: {
  //   type: String,
  //   required: true,
  // },
  // staffPassword: {
  //   type: String,
  //   required: true,
  // },
  aadharNumber: {
    type: Number,
    required: true,
  },
});

const clinicModel = mongoose.model<IClinic>("Clinic", clinicSchema, "Clinic");
export default clinicModel;

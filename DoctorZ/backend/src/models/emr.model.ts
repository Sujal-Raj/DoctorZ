import mongoose, { Document, Schema } from "mongoose";

export interface IEMR extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
   name?: string;
   relation?: string;
    aadhar?: number;
  allergies?: string[];
  diseases?: string[];
  pastSurgeries?: string[];
  currentMedications?: string[];

  reports?: string[];               // file URLs / paths
  prescriptionId?: mongoose.Types.ObjectId;

 
}

const emrSchema = new mongoose.Schema<IEMR>(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      default: null,
      
    },
    name: {
      type: String,
      default: "",
    },
    relation: {
      type: String,
      default: "self",
    },
    aadhar: {
      type: Number,
      default: null,
    },

    allergies: {
      type: [String],
      default: [],
      
    },

    diseases: {
      type: [String],
      default: [],
    },

    pastSurgeries: {
      type: [String],
      default: [],
    },

    currentMedications: {
      type: [String],
      default: [],
    },

    reports: {
      type: [String],       // stored as file URL path
      default: [],
    },

    prescriptionId: {
      type: Schema.Types.ObjectId,
      ref: "Prescription",
      default: null,
    },

  
  },
  { timestamps: true }
);

const EMRModel = mongoose.model<IEMR>("EMR", emrSchema, "EMR");

export default EMRModel;

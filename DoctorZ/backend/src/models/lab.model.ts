import mongoose, { Document, Model } from "mongoose";

// ---------- Interfaces ----------
interface Timings {
  open: string;
  close: string;
}
export type TestCategory =
  | "Liver"
  | "Kidney"
  | "Diabetes"
  | "Fever"
  | "Vitamin"
  | "Pregnancy"
  | "Heart"
  | "Other";

export interface Test {
  testName: string;
  price: number;
  description:string,
  precaution:string,
     category: string, 
  customCategory?: string;
  labId: mongoose.Types.ObjectId;           
}


export interface Lab extends Document {
  labId?: string | null;         // optional generated Lab ID
  name: string;
  email: string;
  password: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
  status: "pending" | "approved" | "rejected"; // restricted values
 
  timings: Timings;
  createdAt?: string;
  updatedAt?: string;
}

export interface LabTestBooking extends Document {
  labId: mongoose.Types.ObjectId;    // ObjectId reference to Lab
  userId: mongoose.Types.ObjectId;   // ObjectId reference to LabUser
  testName: string;
  bookingDate: Date;
  status: "pending" | "completed" | "cancelled";
  reportFile?: string | null;
}

// ---------- Lab Schema ----------
const labSchema = new mongoose.Schema<Lab>({
  labId: { type: String, default: null },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  state: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  status: { type: String, default: "pending" },
  
  timings: {
    open: { type: String, required: true },
    close: { type: String, required: true },
  },
}, { timestamps: true });

// ---------- Lab Test Booking Schema ----------
const labTestBookingSchema = new mongoose.Schema<LabTestBooking>({
  labId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lab', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  testName: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
  reportFile: { type: String, default: null },
}, { timestamps: true });



const testSchema = new mongoose.Schema<Test>({
  testName: String,
  description: String,
  price: Number,
  precaution: String,
  labId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lab"
  },
  category: {
    type: String,
   
    required: true
  },
   customCategory: { type: String }

});

// ---------- Model Exports ----------
export const LabModel: Model<Lab> = mongoose.model('Lab', labSchema);
export const LabTestBookingModel: Model<LabTestBooking> = mongoose.model('LabTestBooking', labTestBookingSchema);
export const TestModel:Model<Test>=mongoose.model('Test',testSchema);
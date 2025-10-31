


import mongoose, { Schema, Document } from "mongoose";

export interface IPatientInfo {
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  aadhar: string;
  contact: string;
}

export interface IBooking extends Document {
  doctorId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId; // who booked
  patient: IPatientInfo;
  slotId: mongoose.Types.ObjectId;
  datetime: Date;
  mode: "online" | "offline";
  fees: number;
  status: "booked" | "cancelled" | "completed"; // ✅ add this
  createdAt: Date;
  updatedAt: Date;
  roomId:string;
}

const bookingSchema = new Schema<IBooking>(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "Patient", required: true }, // new field
    patient: {
      type: Object,
      required: true,
      default: {},
    },
    slotId: { type: Schema.Types.ObjectId, ref: "TimeSlot", required: true },
    datetime: { type: Date, required: true },
    mode: { type: String, enum: ["online", "offline"], required: true },
    fees: { type: Number, required: true },
     status: {
      type: String,
      enum: ["booked", "cancelled", "completed"],
      default: "booked",
      required: true,
    },
    roomId:{
      type:String,
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
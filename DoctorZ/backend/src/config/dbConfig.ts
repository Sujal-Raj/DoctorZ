import mongoose from "mongoose";
import patientModel from "../models/patient.model.js";

const dbConnect = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
    console.log("Database not connected");
  }
};

//------This is just to test-----
const testPatientModel = async () => {
  try {
    const testPatient = new patientModel({
      fullName: "Test User",
      gender: "Male",
      dob: new Date("1990-01-01"),
      mobileNumber: 9876543210,
      Aadhar: 123456789012,
      address: {
        city: "Mumbai",
        pincode: 400001,
      },
      abhaId: "ABHA123456",
      emergencyContact: {
        name: "John Doe",
        number: 9123456789,
      },
    });

    const savedPatient = await testPatient.save();
    console.log("🧪 Test patient saved:", savedPatient.fullName);
  } catch (error) {
    console.error("⚠️ Error saving test patient:", error);
  }
};

export default dbConnect;

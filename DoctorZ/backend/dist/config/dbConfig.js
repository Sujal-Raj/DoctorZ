import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import patientModel from "../models/patient.model.js";
let MONGO_URI;
console.log(process.env.MONGO_DEVELOPMENT_URI, process.env.MONGO_ATLAS_URI);
if (process.env.NODE_ENV == "development") {
    MONGO_URI = process.env.MONGO_DEVELOPMENT_URI;
}
else {
    MONGO_URI = process.env.MONGO_ATLAS_URI;
}
;
console.log(MONGO_URI);
const dbConnect = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI environment variable is not defined");
        }
        await mongoose.connect(MONGO_URI);
        console.log("Database Connected");
    }
    catch (error) {
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
    }
    catch (error) {
        console.error("⚠️ Error saving test patient:", error);
    }
};
export default dbConnect;
//# sourceMappingURL=dbConfig.js.map
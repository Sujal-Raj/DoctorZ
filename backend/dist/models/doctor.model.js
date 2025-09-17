import mongoose from 'mongoose';
import { Types } from 'mongoose';
const doctorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true,
    },
    MobileNo: {
        type: Number,
        required: true,
    },
    MedicalRegistrationNumber: {
        type: Number,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    DegreeCertificate: {
        type: String,
        // required:true,
    },
    experience: {
        type: Number,
        required: true,
    },
    consultationFee: {
        type: Number,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    Aadhar: {
        type: Number,
        required: true,
    },
    signature: {
        type: String,
        // required:true,
    },
    photo: {
        type: String,
        // required:true,
    },
    clinic: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clinic',
        }]
});
const doctorModel = mongoose.model("Doctor", doctorSchema, "Doctor");
export default doctorModel;
//# sourceMappingURL=doctor.model.js.map
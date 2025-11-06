import mongoose from "mongoose";
const patientSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    aadhar: {
        type: Number,
    },
    address: {
        city: {
            type: String,
            require: true,
        },
        pincode: {
            type: Number,
        }
    },
    abhaId: {
        type: String,
    },
    emergencyContact: {
        name: {
            type: String,
        },
        number: {
            type: Number
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
}, { timestamps: true });
const patientModel = mongoose.model("Patient", patientSchema, "Patient");
export default patientModel;
//# sourceMappingURL=patient.model.js.map
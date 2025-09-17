import mongoose from "mongoose";
const clinicSchema = new mongoose.Schema({
    clinicName: {
        type: String,
        required: true
    },
    clinicType: {
        type: String,
        enum: ["Hospital", "Polyclinic", "Individual Practice", "Diagnostic Center"],
        required: true,
    },
    specialties: { type: [String], required: true },
    address: {
        state: { type: String, required: true },
        district: { type: String, required: true },
        pincode: { type: Number, required: true },
    },
    contact: {
        phone: { type: String, required: true },
        email: { type: String, required: true },
    },
    doctors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor"
        }
    ],
    clinicLicenseNumber: { type: Number, required: true },
    operatingHours: { type: String, required: true },
    staffName: {
        type: String,
        required: true
    },
    staffEmail: {
        type: String,
        required: true
    },
    staffPassword: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: Number,
        required: true
    }
});
const clinicModel = mongoose.model("Clinic", clinicSchema, "Clinic");
export default clinicModel;
//# sourceMappingURL=clinic.model.js.map
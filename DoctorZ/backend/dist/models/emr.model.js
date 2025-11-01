import mongoose, { Document, Schema } from "mongoose";
const emrSchema = new mongoose.Schema({
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
        type: [String], // stored as file URL path
        default: [],
    },
    prescriptionId: {
        type: Schema.Types.ObjectId,
        ref: "Prescription",
        default: null,
    },
}, { timestamps: true });
const EMRModel = mongoose.model("EMR", emrSchema, "EMR");
export default EMRModel;
//# sourceMappingURL=emr.model.js.map
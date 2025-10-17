import mongoose, { Document, Model } from "mongoose";
// ---------- Lab Schema ----------
const labSchema = new mongoose.Schema({
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
const labTestBookingSchema = new mongoose.Schema({
    labId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lab', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    testName: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, default: "pending" },
    reportFile: { type: String, default: null },
}, { timestamps: true });
const testSchema = new mongoose.Schema({
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
export const LabModel = mongoose.model('Lab', labSchema);
export const LabTestBookingModel = mongoose.model('LabTestBooking', labTestBookingSchema);
export const TestModel = mongoose.model('Test', testSchema);
//# sourceMappingURL=lab.model.js.map
import mongoose, { Schema, Document } from "mongoose";
const bookingSchema = new Schema({
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    patient: {
        type: Object,
        required: true,
        default: {},
    },
    // ✅ Link to EMR document
    emrId: {
        type: Schema.Types.ObjectId,
        ref: "EMR",
        default: null,
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
    roomId: {
        type: String,
        required: true,
    }
}, { timestamps: true });
const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
//# sourceMappingURL=booking.model.js.map
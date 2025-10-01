import mongoose, { Schema, Document } from "mongoose";
const bookingSchema = new Schema({
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    slotId: { type: Schema.Types.ObjectId, ref: "TimeSlot", required: true },
    datetime: { type: Date, required: true },
    mode: { type: String, enum: ["online", "offline"], required: true },
    fees: { type: Number, required: true },
}, { timestamps: true });
const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
//# sourceMappingURL=booking.model.js.map
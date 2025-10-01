import mongoose, { Document } from "mongoose";
export interface IBooking extends Document {
    doctorId: mongoose.Types.ObjectId;
    patientId: mongoose.Types.ObjectId;
    slotId: mongoose.Types.ObjectId;
    datetime: Date;
    mode: "online" | "offline";
    fees: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const Booking: mongoose.Model<IBooking, {}, {}, {}, mongoose.Document<unknown, {}, IBooking, {}, {}> & IBooking & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Booking;
//# sourceMappingURL=booking.model.d.ts.map
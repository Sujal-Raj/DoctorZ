import mongoose, { Document } from "mongoose";
export interface IPatientInfo {
    name: string;
    age: number;
    gender: "Male" | "Female" | "Other";
    aadhar: string;
    contact: string;
}
export interface IBooking extends Document {
    doctorId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    patient: IPatientInfo;
    emrId?: mongoose.Types.ObjectId;
    slotId: mongoose.Types.ObjectId;
    datetime: Date;
    mode: "online" | "offline";
    fees: number;
    status: "booked" | "cancelled" | "completed";
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
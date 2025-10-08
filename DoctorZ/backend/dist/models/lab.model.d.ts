import mongoose, { Document, Model } from "mongoose";
interface Timings {
    open: string;
    close: string;
}
interface Test {
    name: string;
    price: number;
}
export interface Lab extends Document {
    labId?: string | null;
    name: string;
    email: string;
    password: string;
    state: string;
    city: string;
    pincode: string;
    address: string;
    status: "pending" | "approved" | "rejected";
    tests: Test[];
    pricing?: Record<string, number>;
    timings: Timings;
    createdAt?: string;
    updatedAt?: string;
}
export interface LabTestBooking extends Document {
    labId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    testName: string;
    bookingDate: Date;
    status: "pending" | "completed" | "cancelled";
    reportFile?: string | null;
}
export declare const LabModel: Model<Lab>;
export declare const LabTestBookingModel: Model<LabTestBooking>;
export {};
//# sourceMappingURL=lab.model.d.ts.map
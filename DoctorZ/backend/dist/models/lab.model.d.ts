import mongoose, { Document, Model } from "mongoose";
interface Timings {
    open: string;
    close: string;
}
export type TestCategory = "Liver" | "Kidney" | "Diabetes" | "Fever" | "Vitamin" | "Pregnancy" | "Heart" | "Other";
export interface Test {
    testName: string;
    price: number;
    description: string;
    precaution: string;
    category: string;
    customCategory?: string;
    labId: mongoose.Types.ObjectId;
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
    timings: Timings;
    certificateNumber: string;
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
export interface LabPackage extends Document {
    labId: mongoose.Types.ObjectId;
    packageName: string;
    description?: string;
    tests: mongoose.Types.ObjectId[];
    totalPrice: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const LabModel: Model<Lab>;
export declare const LabTestBookingModel: Model<LabTestBooking>;
export declare const TestModel: Model<Test>;
export declare const LabPackageModel: Model<LabPackage>;
export {};
//# sourceMappingURL=lab.model.d.ts.map
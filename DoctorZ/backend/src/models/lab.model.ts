// import mongoose, { Document, Model } from "mongoose";

// // ---------- Interfaces ----------
// interface Timings {
//   open: string;
//   close: string;
// }

// export type TestCategory =
//   | "Liver"
//   | "Kidney"
//   | "Diabetes"
//   | "Fever"
//   | "Vitamin"
//   | "Pregnancy"
//   | "Heart"
//   | "Other";

// export interface Test {
//   testName: string;
//   price: number;
//   description: string;
//   precaution: string;
//   category: string;
//   customCategory?: string;
//   labId: mongoose.Types.ObjectId;
// }

// export interface Lab extends Document {
//   labId?: string | null;
//   name: string;
//   email: string;
//   password: string;
//   state: string;
//   city: string;
//   pincode: string;
//   address: string;
//   status: "pending" | "approved" | "rejected";
//   timings: Timings;
//   certificateNumber: string; // ✅ New Field
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface LabTestBooking extends Document {
//   labId: mongoose.Types.ObjectId;
//   userId: mongoose.Types.ObjectId;
//   testName: string;
//   bookingDate: Date;
//   status: "pending" | "completed" | "cancelled";
//   reportFile?: string | null;
// }

// // ✅ New Interface for Lab Package
// export interface LabPackage extends Document {
//   labId: mongoose.Types.ObjectId;
//   packageName: string;
//   description?: string;
//   tests: mongoose.Types.ObjectId[]; // Array of test references
//   totalPrice: number;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// export interface PackageBooking extends Document {
//   packageId: mongoose.Types.ObjectId;
//   labId: mongoose.Types.ObjectId;
//   tests: mongoose.Types.ObjectId[];
//   userId: mongoose.Types.ObjectId;
//   bookingDate: Date;
//   status: "pending" | "completed";
//   reportFile?: string | null;
// }
// // ---------- Lab Schema ----------
// const labSchema = new mongoose.Schema<Lab>(
//   {
//     labId: { type: String, default: null },
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     state: { type: String, required: true },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     pincode: { type: String, required: true },
//     status: { type: String, default: "pending" },
//     certificateNumber: { type: String, required: true }, // ✅ Added here
//     timings: {
//       open: { type: String, required: true },
//       close: { type: String, required: true },
//     },
//   },
//   { timestamps: true }
// );

// // ---------- Lab Test Booking Schema ----------
// const labTestBookingSchema = new mongoose.Schema<LabTestBooking>(
//   {
//     labId: { type: mongoose.Schema.Types.ObjectId, ref: "Lab", required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
//     testName: { type: String, required: true },
//     bookingDate: { type: Date, default: Date.now },
//     status: { type: String, default: "pending" },
//     reportFile: { type: String, default: null },
//   },
//   { timestamps: true }
// );

// // ---------- Test Schema ----------
// const testSchema = new mongoose.Schema<Test>({
//   testName: String,
//   description: String,
//   price: Number,
//   precaution: String,
//   labId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Lab",
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   customCategory: { type: String },
// });

// // ✅ New Package Schema ----------
// const labPackageSchema = new mongoose.Schema<LabPackage>(
//   {
//     labId: { type: mongoose.Schema.Types.ObjectId, ref: "Lab", required: true },
//     packageName: { type: String, required: true },
//     description: { type: String },
//     tests: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Test",
//         required: true,
//       },
//     ],
//     totalPrice: { type: Number, required: true },
//   },
//   { timestamps: true }
// );



// const packageBookingSchema = new mongoose.Schema<PackageBooking>( 
//   {
//     packageId: { type: mongoose.Schema.Types.ObjectId, ref: "LabPackage", required: true },
//       labId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Lab",
//     required: true
//   },
//   tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }],

//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
//     bookingDate: { type: Date, default: Date.now },
//     status: { type: String,   enum: ["pending", "completed"], default: "pending" },
//     reportFile: { type: String, default: null },
//   },
//   { timestamps: true }
// );


// // ---------- Model Exports ----------
// export const LabModel: Model<Lab> = mongoose.model("Lab", labSchema);
// export const LabTestBookingModel: Model<LabTestBooking> = mongoose.model(
//   "LabTestBooking",
//   labTestBookingSchema
// );
// export const TestModel: Model<Test> = mongoose.model("Test", testSchema);
// export const LabPackageModel: Model<LabPackage> = mongoose.model("LabPackage", labPackageSchema);
// export const PackageBookingModel = mongoose.model("PackageBooking", packageBookingSchema);



///////////////////// Manish Works (Final Fixed Version) ///////////////////////
import mongoose, { Schema, Document } from "mongoose";

// ------------------ LAB MODEL ------------------
export interface LabDocument extends Document {
  labId: string;
  name: string;
  email: string;
  password: string;
  state: string;
  city: string;
  address: string;
  pincode: string;
  timings: {
    open: string;
    close: string;
  };
  certificateNumber: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

const LabSchema = new Schema<LabDocument>(
  {
    labId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    timings: {
      open: { type: String, required: true },
      close: { type: String, required: true },
    },
    certificateNumber: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const LabModel = mongoose.model<LabDocument>("Lab", LabSchema);

// ------------------ TEST MODEL ------------------
export interface TestDocument extends Document {
  testName: string;
  description: string;
  category: string;
  customCategory?: string;
  precaution: string;
  price: number;
  labId: mongoose.Types.ObjectId;
}

const TestSchema = new Schema<TestDocument>(
  {
    testName: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    customCategory: { type: String },
    precaution: { type: String },
    price: { type: Number, required: true },
    labId: { type: Schema.Types.ObjectId, ref: "Lab", required: true },
  },
  { timestamps: true }
);

export const TestModel = mongoose.model<TestDocument>("LabTest", TestSchema);

// ------------------ LAB TEST BOOKING MODEL ------------------
export interface LabTestBookingDocument extends Document {
  labId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  testName: string;
  category: string;
  price: number;
  status: "pending" | "completed" | "cancelled";
  bookedAt: Date;
}

const LabTestBookingSchema = new Schema<LabTestBookingDocument>(
  {
    labId: { type: Schema.Types.ObjectId, ref: "Lab", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    testName: { type: String, required: true },
    category: { type: String },
    price: { type: Number },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    bookedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const LabTestBookingModel = mongoose.model<LabTestBookingDocument>(
  "LabTestBooking",
  LabTestBookingSchema
);

// ------------------ LAB PACKAGE MODEL ------------------
export interface LabPackageDocument extends Document {
  labId: mongoose.Types.ObjectId;
  packageName: string;
  description: string;
  tests: mongoose.Types.ObjectId[];
  totalPrice: number;
  createdAt: Date;
}

const LabPackageSchema = new Schema<LabPackageDocument>(
  {
    labId: { type: Schema.Types.ObjectId, ref: "Lab", required: true },
    packageName: { type: String, required: true },
    description: { type: String },
    tests: [{ type: Schema.Types.ObjectId, ref: "LabTest" }],
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const LabPackageModel = mongoose.model<LabPackageDocument>(
  "LabPackage",
  LabPackageSchema
);

// ------------------ PACKAGE BOOKING MODEL ------------------
export interface PackageBookingDocument extends Document {
  packageId: mongoose.Types.ObjectId;
  labId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  tests: mongoose.Types.ObjectId[];
  bookingDate: Date;
  status: "pending" | "completed" | "cancelled";
}

const PackageBookingSchema = new Schema<PackageBookingDocument>(
  {
    packageId: { type: Schema.Types.ObjectId, ref: "LabPackage", required: true },
    labId: { type: Schema.Types.ObjectId, ref: "Lab", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    tests: [{ type: Schema.Types.ObjectId, ref: "LabTest" }],
    bookingDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const PackageBookingModel = mongoose.model<PackageBookingDocument>(
  "PackageBooking",
  PackageBookingSchema
);

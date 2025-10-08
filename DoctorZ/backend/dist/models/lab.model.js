// import mongoose,{Document,Model} from "mongoose";
// interface Timings {
//   open: string;
//   close: string;
// }
// interface Test {
//   name: string;
//   price: number;
// }
// export interface Lab extends Document {
//   labId?: string | null;    // generated lab id (optional)
//   name: string;
//   email: string;
//   password: string;
//   state: string;
//   city: string;
//   pincode: string;
//   address: string;
//   status: "pending" | "approved" | "rejected"; // restricted values
//   tests: Test[];            // array of test objects
//   pricing?: Record<string, number>; // Map of testName → price (optional)
//   timings: Timings;
//   createdAt?: string;
//   updatedAt?: string;
// }
// const labSchema = new mongoose.Schema<Lab>({
//     labId:{type:String,default:null,required:false},
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   state: { type: String, required: true },
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   pincode: { type: String, required: true },
//     status: {
//   type: String,
//   default: "pending"   
// },
//   // Tests -> array of objects
//   tests: [
//     {
//       name: { type: String, required: true },
//       price: { type: Number, required: true }
//     }
//   ],
//   // Pricing optional (kyunki tum tests me hi price store kar rahe ho)
//   pricing: {
//     type: Map,
//     of: Number,
//   },
//   // Timings -> open / close
//   timings: {
//     open: { type: String, required: true },
//     close: { type: String, required: true }
//   }
// },{timestamps:true});
// export interface LabTestBooking  extends Document{
//   labId: mongoose.Types.ObjectId;      // ObjectId of Lab
//   userId: mongoose.Types.ObjectId;     // ObjectId of LabUser   // ObjectId of LabUser
//   testName: string;
//   bookingDate: Date;  // ISO string (Date type from backend)
//   status: "pending" | "completed" | "cancelled"; 
//   reportFile?: string | null; // uploaded report file (optional)
// }
// const labTestBooking=new mongoose.Schema<LabTestBooking>({
//   labId:{type:mongoose.Schema.Types.ObjectId,ref:'Lab'},
//   userId:{type:mongoose.Schema.Types.ObjectId,ref:'LabUser'},
//   testName:{type:String,required:true},
//   bookingDate:{type:Date,default:Date.now},
//   status: {
//   type: String,
//   default: "pending"   
// },
// reportFile: {
//     type: String,   // uploaded report ka file naam
//     default: null,
//   }
// },{timestamps:true});
//    export const LabTestBookingModel: Model<LabTestBooking> = mongoose.model('LabTestBooking', labTestBooking);
// export const LabModel: Model<Lab> = mongoose.model('Lab', labSchema);
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
    tests: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
        },
    ],
    pricing: { type: Map, of: Number },
    timings: {
        open: { type: String, required: true },
        close: { type: String, required: true },
    },
}, { timestamps: true });
// ---------- Lab Test Booking Schema ----------
const labTestBookingSchema = new mongoose.Schema({
    labId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lab', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'LabUser', required: true },
    testName: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, default: "pending" },
    reportFile: { type: String, default: null },
}, { timestamps: true });
// ---------- Model Exports ----------
export const LabModel = mongoose.model('Lab', labSchema);
export const LabTestBookingModel = mongoose.model('LabTestBooking', labTestBookingSchema);
//# sourceMappingURL=lab.model.js.map
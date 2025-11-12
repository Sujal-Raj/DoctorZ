import mongoose from "mongoose";
import { Types } from "mongoose";
export interface IDoctor extends Document {
    doctorId: string;
    fullName: string;
    password: string;
    email: string;
    gender: string;
    dob: Date;
    MobileNo: string;
    MedicalRegistrationNumber: string;
    specialization: string;
    qualification: string;
    DegreeCertificate: string;
    experience: number;
    consultationFee: number;
    language: string;
    Address: string;
    State: string;
    City: string;
    Aadhar: number;
    signature: string;
    photo: string;
    clinic: Types.ObjectId[];
    status?: string;
}
declare const doctorModel: mongoose.Model<IDoctor, {}, {}, {}, mongoose.Document<unknown, {}, IDoctor, {}, mongoose.DefaultSchemaOptions> & IDoctor & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<IDoctor, mongoose.Model<IDoctor, any, any, any, mongoose.Document<unknown, any, IDoctor, any, {}> & IDoctor & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IDoctor, mongoose.Document<unknown, {}, mongoose.FlatRecord<IDoctor>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<IDoctor> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>>;
export default doctorModel;
//# sourceMappingURL=doctor.model.d.ts.map
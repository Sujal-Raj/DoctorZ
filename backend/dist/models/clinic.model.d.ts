import mongoose from "mongoose";
export interface IClinic extends Document {
    clinicName: string;
    clinicType: "Hospital" | "Polyclinic" | "Individual Practice" | "Diagnostic Center";
    specialties: string[];
    address: {
        state: string;
        district: string;
        pincode: number;
    };
    contact: {
        phone: string;
        email: string;
    };
    doctors: mongoose.Types.ObjectId[];
    operatingHours: string;
    clinicLicenseNumber: number;
    aadharNumber: number;
    staffName: string;
    staffEmail: string;
    staffPassword: string;
}
declare const clinicModel: mongoose.Model<IClinic, {}, {}, {}, mongoose.Document<unknown, {}, IClinic, {}, mongoose.DefaultSchemaOptions> & IClinic & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<IClinic, mongoose.Model<IClinic, any, any, any, mongoose.Document<unknown, any, IClinic, any, {}> & IClinic & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IClinic, mongoose.Document<unknown, {}, mongoose.FlatRecord<IClinic>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<IClinic> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default clinicModel;
//# sourceMappingURL=clinic.model.d.ts.map
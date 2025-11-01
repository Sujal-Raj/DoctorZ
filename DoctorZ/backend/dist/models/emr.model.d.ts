import mongoose, { Document } from "mongoose";
export interface IEMR extends Document {
    patientId: mongoose.Types.ObjectId;
    doctorId: mongoose.Types.ObjectId;
    allergies?: string[];
    diseases?: string[];
    pastSurgeries?: string[];
    currentMedications?: string[];
    reports?: string[];
    prescriptionId?: mongoose.Types.ObjectId;
}
declare const EMRModel: mongoose.Model<IEMR, {}, {}, {}, mongoose.Document<unknown, {}, IEMR, {}, {}> & IEMR & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default EMRModel;
//# sourceMappingURL=emr.model.d.ts.map
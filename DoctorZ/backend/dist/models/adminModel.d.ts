import { Document, Model } from 'mongoose';
export interface IAdmin extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
declare const Admin: Model<IAdmin>;
export default Admin;
//# sourceMappingURL=adminModel.d.ts.map
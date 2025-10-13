import type { Request, Response } from "express";
import mongoose from "mongoose";
export type TestCategory = "Liver" | "Kidney" | "Diabetes" | "Fever" | "Vitamin" | "Pregnancy" | "Heart" | "Other";
export interface Test {
    testName: string;
    price: number;
    description: string;
    precaution: string;
    category: TestCategory;
    customCategory?: string;
    labId: mongoose.Types.ObjectId;
}
declare const _default: {
    labRegister: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    labLogin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    addTestBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    addTest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getLabById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateLabProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllLabTests: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllTestByLabId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteLabTest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateLabTest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getLabPatients: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
//# sourceMappingURL=lab.controller.d.ts.map
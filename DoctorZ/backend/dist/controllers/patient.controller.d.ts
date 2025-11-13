import type { Request, Response } from "express";
declare const _default: {
    patientRegister: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    patientLogin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getPatientById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAvailableSlotsByDoctorId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updatePatient: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getBookedDoctor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    addFavouriteDoctor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    isFavouriteDoctor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    addfavouriteClinic: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    isFavouriteClinic: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
//# sourceMappingURL=patient.controller.d.ts.map
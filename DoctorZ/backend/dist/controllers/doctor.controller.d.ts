import type { Response, Request } from "express";
export declare const getTodaysBookedAppointments: (req: Request, res: Response) => Promise<void>;
export declare const getTotalPatients: (req: Request, res: Response) => Promise<void>;
declare const _default: {
    getAllDoctors: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    doctorRegister: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getDoctorById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteDoctor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateDoctor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getClinicDoctors: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    doctorLogin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getTodaysBookedAppointments: (req: Request, res: Response) => Promise<void>;
    getTotalPatients: (req: Request, res: Response) => Promise<void>;
};
export default _default;
//# sourceMappingURL=doctor.controller.d.ts.map
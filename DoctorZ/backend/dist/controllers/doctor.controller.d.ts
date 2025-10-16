import type { Request, Response } from 'express';
declare const _default: {
    getAllDoctors: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    doctorRegister: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getDoctorById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteDoctor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateDoctor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getClinicDoctors: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    doctorLogin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    logoutDoctor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
//# sourceMappingURL=doctor.controller.d.ts.map
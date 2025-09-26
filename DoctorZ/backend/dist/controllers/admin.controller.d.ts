import type { Request, Response } from "express";
export declare const adminLogin: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const getPendingDoctors: (req: Request, res: Response) => Promise<Response>;
export declare const approveDoctor: (req: Request, res: Response) => Promise<Response>;
export declare const rejectDoctor: (req: Request, res: Response) => Promise<Response>;
//# sourceMappingURL=admin.controller.d.ts.map
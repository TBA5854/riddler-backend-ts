import { Request, Response, NextFunction } from "express";
export declare function otpValidator(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function ownerValidator(req: Request, res: Response, next: NextFunction): Promise<void>;

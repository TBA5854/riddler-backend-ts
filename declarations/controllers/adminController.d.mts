import { Request, Response } from "express";
export declare function makeUserAdmin(req: Request, res: Response): Promise<void>;
export declare function revokeAdmin(req: Request, res: Response): Promise<void>;
export declare function getAllTeams(_req: Request, res: Response): Promise<void>;
export declare function getTeamById(req: Request, res: Response): Promise<void>;

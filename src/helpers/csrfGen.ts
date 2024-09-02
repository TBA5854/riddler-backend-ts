import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export function generateCSRFToken(_req: Request, res: Response, next: NextFunction) {
    const csrfToken = crypto.randomBytes(32).toString('hex');
    res.cookie('csrfToken', csrfToken, { httpOnly: true });
    next();
}
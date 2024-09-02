import crypto from 'crypto';
export function generateCSRFToken(_req, res, next) {
    const csrfToken = crypto.randomBytes(32).toString('hex');
    res.cookie('csrfToken', csrfToken, { httpOnly: true });
    next();
}

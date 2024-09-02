import { Router } from 'express';
import { resetPassword, changePassword } from '../controllers/userController.mjs';
import { authverify } from '../middleware/authMiddleware.mjs';

const router = Router();

router.put('/passwd', authverify, changePassword);
router.post('/reset/:user/:token', resetPassword);

export default router;
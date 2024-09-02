import { Router } from "express";
import { login, logout, signup } from "../controllers/authController.mjs";
import { revokeAdmin, makeUserAdmin } from "../controllers/adminController.mjs";
import { authverify,  } from "../middleware/authMiddleware.mjs";
import { isAdmin } from "../middleware/adminMiddleware.mjs";
const router: Router = Router();

router.get('/logout', logout);
router.post('/login', login);
router.post('/signup', signup);
router.get('/adminify', authverify, isAdmin, makeUserAdmin);
router.get('/deadminify', authverify, isAdmin, revokeAdmin);

export default router;

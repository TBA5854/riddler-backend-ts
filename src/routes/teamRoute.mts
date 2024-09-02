import { Router } from "express";
import { otpValidator, ownerValidator } from "../middleware/teamMiddleware.mjs";
import { createTeam, editTeam, joinTeam } from "../controllers/teamController.mjs";
import { authverify } from "../middleware/authMiddleware.mjs";

const router: Router = Router();

router.post('/create', authverify, createTeam);
router.put('/edit/:tname', authverify, ownerValidator, editTeam);
router.post('/join/:tname', authverify, otpValidator, joinTeam);

export default router;
import { Router } from "express";
import { authverify } from "../middleware/authMiddleware.mjs";
import { isAdmin } from "../middleware/adminMiddleware.mjs";
import { getAllTeams, getTeamById } from "../controllers/adminController.mjs";

const router: Router = Router();

router.get("/getAll", authverify, isAdmin, getAllTeams);
router.get("/getById", authverify, isAdmin, getTeamById)

export default router;
import { Request, Response } from "express";
import User from "../models/User.mjs";
import Team from "../models/team.mjs";

export async function makeUserAdmin(req: Request, res: Response): Promise<void> {
    const username = req.query.username;
    const user = await User.findOneAndUpdate({ username }, { admin: true, adminedAt: new Date() })
    if (!user) {
        res.send("User Not Found");
        return;
    } else {
        res.send("Successfully Adminified");
        return;
    }
}

export async function revokeAdmin(req: Request, res: Response): Promise<void> {
    const username = req.query.username;
    const user = await User.findOneAndUpdate({ username }, { admin: false, adminedAt: null })
    if (!user) {
        res.send("User Not Found");
        return;
    } else {
        res.send("Successfully DeAdminified");
        return;
    }
}

export async function getAllTeams(_req: Request, res: Response) {
    res.send(await Team.find());
}

export async function getTeamById(req: Request, res: Response) {
    const name = req.query["name"];
    res.send(await Team.find({ name }));
}
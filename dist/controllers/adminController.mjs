import User from "../models/User.mjs";
import Team from "../models/team.mjs";
export async function makeUserAdmin(req, res) {
    const username = req.query.username;
    const user = await User.findOneAndUpdate({ username }, { admin: true, adminedAt: new Date() });
    if (!user) {
        res.send("User Not Found");
        return;
    }
    else {
        res.send("Successfully Adminified");
        return;
    }
}
export async function revokeAdmin(req, res) {
    const username = req.query.username;
    const user = await User.findOneAndUpdate({ username }, { admin: false, adminedAt: null });
    if (!user) {
        res.send("User Not Found");
        return;
    }
    else {
        res.send("Successfully DeAdminified");
        return;
    }
}
export async function getAllTeams(_req, res) {
    res.send(await Team.find());
}
export async function getTeamById(req, res) {
    const name = req.query["name"];
    res.send(await Team.find({ name }));
}

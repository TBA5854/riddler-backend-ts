import Team from "../models/team.mjs";
import jwt from "jsonwebtoken";
import User from "../models/User.mjs";
export async function createTeam(req, res) {
    const name = req.body["name"];
    const owner_tkn = jwt.verify(req.cookies["X-Auth-Token"], process.env.SECRET_KEY);
    const owner = await User.findById(owner_tkn.user_id);
    const otp = Math.floor(1000 + Math.random() * 9000);
    try {
        if (await Team.exists({ name })) {
            res.status(400).send("Team Already Exists");
            return;
        }
        if (!owner || owner.teamId != null) {
            res.status(400).send("Already in a Team");
            return;
        }
        const tid = await Team.create({ name, owner, "teamMembers": [owner], otp });
        await owner.updateOne({ teamId: tid._id });
        res.send("Successfullly Created Team");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error Creating Team");
    }
}
export async function joinTeam(req, res) {
    const name = req.params["tname"];
    const owner = jwt.verify(req.cookies["X-Auth-Token"], process.env.SECRET_KEY);
    const team = await Team.findOne({ name });
    const usr = await User.findById(owner.user_id);
    console.log(usr);
    if (!team) {
        res.status(404).send("Team Not Found");
        return;
    }
    if (team.teamMembers.includes(owner.user_id)) {
        res.status(400).send("Already a Member");
        return;
    }
    if (!usr || !usr["_id"] || usr.teamId != null) {
        res.status(400).send("Already in a Team");
        return;
    }
    if (team.teamMembers.length == 4) {
        res.status(400).send("Team Full");
        return;
    }
    team.teamMembers.push(usr["_id"]);
    usr.teamId = team._id;
    try {
        await usr.save();
        await team.save();
        res.send("Successfully Joined Team");
    }
    catch (err) {
        res.status(500).send("Error Joining Team");
    }
}
export async function editTeam(req, res) {
    const name = req.params["tname"];
    const currentDetails = await Team.findOne({ name });
    if (!currentDetails) {
        res.status(404).send("Team Not Found");
        return;
    }
    const updatedTeam = { name: req.body.name };
    try {
        const hi = await currentDetails.updateOne(updatedTeam);
        console.log(hi);
        res.send("Updated Successfully");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error Updating Team");
    }
}
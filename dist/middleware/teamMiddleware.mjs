import Team from "../models/team.mjs";
import jwt from "jsonwebtoken";
export async function otpValidator(req, res, next) {
    const name = req.params["tname"];
    const otp = req.body["otp"];
    if (name === undefined) {
        res.status(400).send("Please provide a team name");
        return;
    }
    if (otp === undefined) {
        res.status(400).send("Please provide an OTP");
        return;
    }
    const team = await Team.findOne({ name });
    const teamOtp = team ? team.otp : null;
    if (otp !== teamOtp) {
        res.status(401).send("Invalid OTP");
        return;
    }
    next();
}
export async function ownerValidator(req, res, next) {
    const name = req.params["tname"];
    const user = jwt.verify(req.cookies["X-Auth-Token"], process.env.SECRET_KEY);
    const owner = user.user_id;
    if (name === undefined) {
        res.status(400).send("Please provide a team name");
        return;
    }
    if (owner === undefined || owner === null) {
        res.status(400).send("Please provide an owner");
        return;
    }
    const teamOwner = await Team.findOne({ name });
    if (!teamOwner) {
        res.status(404).send("Team Not Found");
        return;
    }
    console.log(owner);
    console.log(teamOwner.owner);
    if (owner != teamOwner.owner) {
        res.status(401).send("Invalid Owner");
        return;
    }
    next();
}

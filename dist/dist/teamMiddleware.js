import Team from "./team";
export async function isAdmin(req, res, next) {
    const name = req.params["tname"];
    const otp = req.body["otp"];
    if (name === undefined) {
        res.status(400).send("Please provide a team name");
    }
    if (otp === undefined) {
        res.status(400).send("Please provide an OTP");
    }
    const teamOtp = await Team.findOne({ name }).select(otp);
    if (otp !== teamOtp) {
        res.status(401).send("Invalid OTP");
    }
    next();
}

import Team from "./team";
export async function getAllTeams(_req, res) {
    res.send(await Team.find());
}
export async function getTeamById(req, res) {
    const id = req.query["id"];
    res.send(await Team.findById(id));
}
export async function createTeam(req, res) {
}
export async function editTeam(req, res) {
    const id = req.query["id"];
    // const updateInfo = {
    // }
    Team.findByIdAndUpdate(id);
    res.send("Updated Successfuly");
}

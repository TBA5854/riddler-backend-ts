import mongoose from "mongoose";
interface Team {
    name: string;
    owner: mongoose.Types.ObjectId;
    teamMembers: Array<mongoose.Types.ObjectId>;
    otp: Number;
}
declare const Team: mongoose.Model<Team, {}, {}, {}, mongoose.Document<unknown, {}, Team> & Team & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<Team, mongoose.Model<Team, any, any, any, mongoose.Document<unknown, any, Team> & Team & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Team, mongoose.Document<unknown, {}, mongoose.FlatRecord<Team>> & mongoose.FlatRecord<Team> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default Team;

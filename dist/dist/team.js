import mongoose from "mongoose";
const teamSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true
    },
    "owner": {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true
    },
    "otp": {
        type: Number,
        required: [true, 'Please enter an email'],
        unique: true,
    },
    teamMembers: {
        type: Array(4),
        required: true
    }
});
teamSchema.pre('save', async function (next) {
    // const otps = await Team.find({}).select("otp");
    const otp = Math.floor(1000 + Math.random() * 9000); //const -> var
    // while (otp in otps) {
    //     otp = Math.floor(1000 + Math.random() * 9000);
    // }
    this.otp = otp;
    next();
});
const Team = mongoose.model('team', teamSchema);
export default Team;

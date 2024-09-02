import mongoose from "mongoose";
const teamSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true
    },
    "owner": {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please enter an email'],
        unique: true,
    },
    "otp": {
        type: Number,
        required: [true, 'Please enter an email'],
        unique: true,
    },
    teamMembers: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    }
});
const Team = mongoose.model('team', teamSchema);
export default Team;

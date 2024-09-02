import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.mjs";
import bcrypt from "bcrypt";

interface Token {
    user_id: mongoose.Types.ObjectId,
    iat: number,
    exp: number
}

export const resetPassword = async (req: Request, res: Response) => {
    const user= req.params["user"];
    const owner_tkn: Token = jwt.verify(req.params["token"], process.env.SECRET_KEY as string) as Token;
    const owner = await User.findById(owner_tkn.user_id);
    if (!owner) {
        res.status(404).send("User Not Found");
        return;
    }
    console.log(owner._id);
    console.log(new mongoose.Types.ObjectId(user));
    if (owner._id.toString() != new mongoose.Types.ObjectId(user).toString()) {
        res.status(400).send("Invalid User");
        return;
    }
    const password = req.body["password"];
    const confirm_password = req.body["confirm_password"];
    if (password != confirm_password) {
        res.status(400).send("Passwords do not match");
        return;
    }
    try {
        owner.password = password;
        await owner.save();
        
    } catch (err) {
        console.log(err);
        res.status(500).send("Error Resetting Password");
        return;
        
    }
    res.status(200).json({ message: 'Password reset successful' });
    //reset link -> /reset/:user/:token where :user is the user object id and :token is the jwt token signed by different secret key
};

export const changePassword = async (req: Request, res: Response) => {
    const owner_tkn: Token = jwt.verify(req.cookies["X-Auth-Token"], process.env.SECRET_KEY as string) as Token;
    const owner = await User.findById(owner_tkn.user_id);
    if (!owner) {
        res.status(404).send("User Not Found");
        return;
    }
    const old_password = req.body["old_password"];
    const new_password = req.body["new_password"];
    const confirm_password = req.body["confirm_password"];
    if (new_password != confirm_password) {
        res.status(400).send("Passwords do not match");
        return;
    }
    const validPassword = await bcrypt.compare(old_password, owner.password);
    if (!validPassword) {
        res.status(400).send("Incorrect Password");
        return;
    }
    try {
        owner.password = new_password;
        await owner.save();
    } catch (err) {
        console.log(err);
        res.status(500).send("Error Changing Password");
        return;
    }
    // TODO: Implement change password logic here

    // Example response
    res.status(200).json({ message: 'Password changed successfully' });
};
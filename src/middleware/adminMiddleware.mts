import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.mjs";

interface Token {
    user_id: string,
    iat: number,
    exp: number
}

export async function isAdmin(req: Request, res: Response, next: Function): Promise<void> {
    const incomimg_token = req.cookies;
    const decodedToken: Token = jwt.verify(incomimg_token['X-Auth-Token'], process.env.SECRET_KEY as string) as Token;
    console.log(decodedToken);
    const user = await User.findById(decodedToken.user_id);
    if (user?.admin) {
        console.log(user)
        next();
    } else {
        res.send("Not Authorised");
    }
}
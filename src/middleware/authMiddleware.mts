import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authverify(req: Request, res: Response, next: Function): void {
    const incomimg_token = req.cookies;
    if (!incomimg_token) {
        res.redirect("/signup");
        return;
    }
    if (!incomimg_token['X-Auth-Token']) {
        res.redirect("/login");
        return;
    }
    jwt.verify(incomimg_token['X-Auth-Token'], process.env.SECRET_KEY as string, (err: any, _decodedtoken: any) => {
        if (err) {
            res.redirect("/login");
            return;
        }
        else {
            // console.log(decodedtoken);
            next();
        }
    });
    return;
}


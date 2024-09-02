import jwt from "jsonwebtoken";
import User from "../models/User.mjs";
export async function isAdmin(req, res, next) {
    const incomimg_token = req.cookies;
    const decodedToken = jwt.verify(incomimg_token['X-Auth-Token'], process.env.SECRET_KEY);
    console.log(decodedToken);
    const user = await User.findById(decodedToken.user_id);
    if (user?.admin) {
        console.log(user);
        next();
    }
    else {
        res.send("Not Authorised");
    }
}

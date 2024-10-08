import jwt from "jsonwebtoken";
export function authverify(req, res, next) {
    const incomimg_token = req.cookies;
    if (!incomimg_token) {
        res.redirect("/signup");
        return;
    }
    if (!incomimg_token['X-Auth-Token']) {
        res.redirect("/login");
        return;
    }
    jwt.verify(incomimg_token['X-Auth-Token'], process.env.SECRET_KEY, (err, _decodedtoken) => {
        if (err) {
            res.redirect("/login");
            return;
        }
        else {
            next();
        }
    });
    return;
}

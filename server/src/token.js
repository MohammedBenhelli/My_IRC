const jwt = require("jsonwebtoken");
const sel = "piscine covid";

export default class token {
    static createToken(id, admin, login){
        return jwt.sign({
            id: id,
            admin: admin,
            login: login
        }, sel, {expiresIn: "24h"});
    };

    static verifToken(cookie){
        return jwt.verify(cookie, sel).admin !== undefined && jwt.verify(cookie, sel).admin === true;
    };

    static getId(cookie){
        return jwt.verify(cookie, sel).id;
    };

    static getLogin(cookie){
        return jwt.verify(cookie, sel).login;
    };
}
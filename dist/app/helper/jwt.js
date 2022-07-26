"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const genericError_1 = require("../error/genericError");
class JWT {
    static signJwt(info) {
        console.log(process.env.SECRET);
        if (process.env.SECRET)
            return jsonwebtoken_1.default.sign(info, process.env.SECRET, { expiresIn: '1h' });
    }
    static authenticate(req, res, next) {
        var token = '';
        // check if there is session attached to the
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            console.log(req.headers.authorization);
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token && req.signedCookies) {
            token = req.signedCookies.jwt;
        }
        if (!token)
            throw new genericError_1.CustomError('invalid credentials', 400);
        try {
            const user = jsonwebtoken_1.default.verify(token, process.env.SECRET);
            req.user = user;
            console.log(user);
            next();
        }
        catch (error) {
            throw new genericError_1.CustomError('invalid Token!', 400);
        }
    }
}
exports.JWT = JWT;

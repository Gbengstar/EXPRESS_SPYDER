"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const userModel_1 = require("../../model/userModel");
const genericError_1 = require("../../error/genericError");
const jwt_1 = require("../../helper/jwt");
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phoneNumber, address, password } = req.body;
    if (!(name && password && address && password)) {
        throw new genericError_1.CustomError('All fields are required for registration', 400);
    }
    // check if phoneNumber length is correct
    if (phoneNumber.length !== 11)
        throw new genericError_1.CustomError('Phone Number must be 11 characters', 400);
    if (password.length < 5)
        throw new genericError_1.CustomError('Password must be 6 or more character ', 400);
    const exist = yield userModel_1.User.finderOne({ phoneNumber });
    if (exist[0])
        throw new genericError_1.CustomError(`${phoneNumber} is already registered with us`, 400);
    try {
        const user = userModel_1.User.createUser({
            name,
            password,
            address,
            phoneNumber,
        });
        yield user.save();
        const token = jwt_1.JWT.signJwt({ name, address, phoneNumber });
        // console.log('token >>', token);
        // await RedisClient.set('jwt', token!);
        res.cookie('jwt', token, { signed: true });
        res
            .status(201)
            .json({ status: 'success', message: 'user created successfuly', token });
    }
    catch (error) {
        throw new genericError_1.CustomError('Error occur while creating user', 500);
    }
});
exports.signUp = signUp;

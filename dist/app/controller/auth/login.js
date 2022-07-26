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
exports.loginController = void 0;
const genericError_1 = require("../../error/genericError");
const jwt_1 = require("../../helper/jwt");
const password_1 = require("../../helper/password");
const userModel_1 = require("../../model/userModel");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = req.body;
    if (!(phoneNumber && password))
        throw new genericError_1.CustomError('Phone Number and Password is required', 400);
    try {
        // find user in the database
        const user = yield userModel_1.User.findOne({ phoneNumber });
        //check if user exist, send error if user do not exist
        if (!user)
            throw new genericError_1.CustomError('invalid phone Number or password', 400);
        //compare password with encrypted saved password
        const check = yield password_1.Password.comparePassword(user === null || user === void 0 ? void 0 : user.password, password);
        // throw an error if the password is not the same with stored password
        if (!check)
            throw new genericError_1.CustomError('Wrong phone number or password', 400);
        // create token for the user
        const token = jwt_1.JWT.signJwt({
            name: user === null || user === void 0 ? void 0 : user.name,
            phoneNumber: user === null || user === void 0 ? void 0 : user.phoneNumber,
            address: user === null || user === void 0 ? void 0 : user.phoneNumber,
        });
        res.cookie('jwt', token, { signed: true });
        // console.log('token >>', token);
        // await RedisClient.set('jwt', token!);
        res
            .status(200)
            .json({ status: 'success', message: `${phoneNumber} logged in!`, token });
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ status: 'fail', message: 'Error occur while logging in!' });
    }
});
exports.loginController = loginController;

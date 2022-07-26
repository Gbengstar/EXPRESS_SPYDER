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
exports.signUpRider = void 0;
const genericError_1 = require("../../error/genericError");
const jwt_1 = require("../../helper/jwt");
const validateRiderDetails_1 = require("../../helper/validateRiderDetails");
const ridersModel_1 = require("../../model/ridersModel");
const signUpRider = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { details } = req.body;
    if (!(0, validateRiderDetails_1.validateRidersDetails)(req)) {
        throw new genericError_1.CustomError('All fields are required for registration', 400);
    }
    // check if phoneNumber length is correct
    if (req.body.phoneNumber.length !== 11)
        throw new genericError_1.CustomError('Phone Number must be 11 characters', 400);
    if (req.body.password.length < 5)
        throw new genericError_1.CustomError('Password must be 6 or more character ', 400);
    const exist = yield ridersModel_1.Rider.findOne({
        phoneNumber: (_a = req.body) === null || _a === void 0 ? void 0 : _a.phoneNumber,
    });
    if (exist)
        throw new genericError_1.CustomError(`${req.body.phoneNumber} is already registered with us`, 400);
    try {
        const rider = ridersModel_1.Rider.createRider(Object.assign({}, req.body));
        yield rider.save();
        const token = jwt_1.JWT.signJwt({
            name: rider.name,
            address: rider.address,
            phoneNumber: rider.phoneNumber,
        });
        // console.log('token >>', token);
        // await RedisClient.set('jwt', token!);
        res.cookie('jwt', token, { signed: true });
        res
            .status(201)
            .json({ status: 'success', message: 'Rider created successfuly', token });
    }
    catch (error) {
        throw new genericError_1.CustomError('Error occur while creating user', 500);
    }
});
exports.signUpRider = signUpRider;

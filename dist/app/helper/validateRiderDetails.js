"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRidersDetails = void 0;
const validateRidersDetails = (req) => {
    const { name, phoneNumber, ridersCard, passport, password, address, preferredRoutes, } = req.body;
    if (!(name &&
        phoneNumber &&
        ridersCard &&
        passport &&
        password &&
        address &&
        preferredRoutes))
        return false;
    return true;
};
exports.validateRidersDetails = validateRidersDetails;

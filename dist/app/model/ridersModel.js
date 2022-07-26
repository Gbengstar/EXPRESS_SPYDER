"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rider = void 0;
const mongoose_1 = require("mongoose");
// Schema of the document
const riderSchema = new mongoose_1.Schema({
    name: String,
    address: String,
    phoneNumber: String,
});
riderSchema.statics.createRider = (rider) => {
    return new Rider(rider);
};
riderSchema.statics.finderOne = (rider) => {
    return Rider.find(rider);
};
const Rider = (0, mongoose_1.model)('Rider', riderSchema);
exports.Rider = Rider;

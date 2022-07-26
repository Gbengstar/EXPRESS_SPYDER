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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const password_1 = require("../helper/password");
const schaType = { type: String, required: true };
const userSchema = new mongoose_1.Schema({
    name: schaType,
    phoneNumber: schaType,
    password: schaType,
    address: String,
}, {
    timestamps: true,
});
userSchema.statics.createUser = (object) => {
    return new User(object);
};
userSchema.statics.finderOne = (object) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.find(object);
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password')) {
            const hashedPass = yield password_1.Password.hashPassword(this.get('password'));
            this.set('password', hashedPass);
        }
        next();
    });
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.User = User;

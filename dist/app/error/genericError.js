"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const abstractError_1 = require("./abstractError");
class CustomError extends abstractError_1.ErrorABC {
    constructor(reason, statusCode) {
        super();
        this.reason = reason;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, abstractError_1.ErrorABC.prototype);
    }
}
exports.CustomError = CustomError;

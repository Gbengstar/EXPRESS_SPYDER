"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const abstractError_1 = require("./abstractError");
class NotFoundError extends abstractError_1.ErrorABC {
    constructor(reason, statusCode) {
        super();
        this.reason = reason;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;

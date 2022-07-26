"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    constructor(reason) {
        super('Error thrown');
        this.reason = reason;
        Object.setPrototypeOf(this, ErrorHandler.prototype);
    }
}
exports.ErrorHandler = ErrorHandler;

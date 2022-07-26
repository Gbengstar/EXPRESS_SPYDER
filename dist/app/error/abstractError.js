"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorABC = void 0;
class ErrorABC extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, ErrorABC.prototype);
    }
}
exports.ErrorABC = ErrorABC;

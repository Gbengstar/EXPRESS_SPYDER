"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandleMiddleware = void 0;
const abstractError_1 = require("../error/abstractError");
const errorHandleMiddleware = (err, req, res, next) => {
    // console.log(err instanceof ErrorABC);
    if (err instanceof abstractError_1.ErrorABC) {
        console.log(err.reason);
        return res
            .status(err.statusCode)
            .json({ status: 'fail', message: err.reason });
    }
};
exports.errorHandleMiddleware = errorHandleMiddleware;

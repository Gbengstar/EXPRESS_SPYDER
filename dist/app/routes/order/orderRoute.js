"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoute = void 0;
const express_1 = require("express");
const createOrder_1 = require("../../controller/order/user/createOrder");
const jwt_1 = require("../../helper/jwt");
const router = (0, express_1.Router)();
exports.OrderRoute = router;
router.post('/create', jwt_1.JWT.authenticate, createOrder_1.createOrder);

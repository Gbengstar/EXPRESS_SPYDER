"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiderRouter = void 0;
const createRider_1 = require("./../../controller/rider/createRider");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.RiderRouter = router;
router.post('/', createRider_1.signUpRider);

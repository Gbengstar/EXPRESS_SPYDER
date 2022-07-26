"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpRouter = void 0;
const auth_1 = require("../../controller/auth/auth");
const express_1 = require("express");
const createUser_1 = require("../../controller/user/createUser");
const jwt_1 = require("../../helper/jwt");
const login_1 = require("../../controller/auth/login");
const logout_1 = require("../../controller/auth/logout");
const router = (0, express_1.Router)();
exports.SignUpRouter = router;
// router.use((req, res, next) => {
//   JWT.authenticate(req, res, next);
// });
// router.use(JWT.authenticate);
router.post('/res', auth_1.userAuth);
router.post('/signup', createUser_1.signUp);
router.post('/login', login_1.loginController);
router.delete('/', jwt_1.JWT.authenticate, logout_1.logout);

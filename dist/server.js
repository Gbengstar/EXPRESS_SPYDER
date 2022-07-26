"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + '/.env' });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const not_found_error_1 = require("./app/error/not-found-error");
const dbConnection_1 = require("./app/helper/dbConnection");
const errorHandlerController_1 = require("./app/middlewares/errorHandlerController");
const authRoute_1 = require("./app/routes/user/authRoute");
const redis_1 = require("./app/helper/redis");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const orderRoute_1 = require("./app/routes/order/orderRoute");
const riderRoutes_1 = require("./app/routes/rider/riderRoutes");
const app = (0, express_1.default)(); //as Express
app.use((0, cookie_parser_1.default)(process.env.SECRET));
//app.set('trust proxy', true);
// const redisStore = connectRedis(Session);
// const client = redis.createClient();
// var sess = {
//   secret: process.env.SECRET || 'little secret',
//   store: new redisStore({
//     host: 'localhost',
//     port: 6379,
//     client: client,
//     ttl: 260,
//   }),
//   saveUninitialized: false,
//   resave: false,
//   cookie: { secure: false },
// };
// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1); // trust first proxy
//   sess.cookie.secure = true; // serve secure cookies
// }
// app.use(Session(sess));
app.use(express_1.default.json());
app.use('/app', authRoute_1.SignUpRouter);
app.use('/order', orderRoute_1.OrderRoute);
app.use('/rider', riderRoutes_1.RiderRouter);
//not found error handler
app.all('*', () => {
    throw new not_found_error_1.NotFoundError('path not found!', 404);
});
// error handler
app.use(errorHandlerController_1.errorHandleMiddleware);
// app.use();
(0, dbConnection_1.dbStarter)().then((value) => __awaiter(void 0, void 0, void 0, function* () {
    if (value) {
        app.listen(2022, () => console.log('App runing on port 2022!'));
        yield (0, redis_1.redisCaller)();
    }
}));

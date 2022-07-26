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
exports.createOrder = void 0;
const OrdersModel_1 = require("../../../model/OrdersModel");
function createOrder(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        // get order details from the request body
        const orderId = OrdersModel_1.OrderModel.OrderNumber((_a = req.user) === null || _a === void 0 ? void 0 : _a.phoneNumber);
        console.log('orderNumber', orderId);
        try {
            const newOrder = yield OrdersModel_1.OrderModel.orderCreator(Object.assign({ orderId, senderPhone: (_b = req.user) === null || _b === void 0 ? void 0 : _b.phoneNumber }, req.body));
            // const newOrder = (await order.save()) as Order;
            console.log('newOder', newOrder);
            res.status(201).json({
                status: 'success',
                message: `Order ${newOrder.orderId}`,
                newOrder,
            });
        }
        catch (error) {
            console.log(error);
            res
                .status(400)
                .json({
                status: 'fail',
                message: 'error occur while creating your order',
            });
        }
    });
}
exports.createOrder = createOrder;

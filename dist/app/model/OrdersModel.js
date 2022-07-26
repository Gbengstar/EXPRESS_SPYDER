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
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    senderPhone: { type: String, required: true },
    orderId: { type: String, required: true },
    senderAddress: { type: String, required: true },
    status: {
        type: String,
        required: true,
        default: 'pending',
        enum: ['pending', 'picked', 'delivered', 'suspend', 'cancel', 'failed'],
    },
    package: [
        {
            price: { type: Number, required: true },
            receiverAddress: { type: String, required: true },
            image: { type: String, required: true },
            receiverPhoneNumber: { type: String, required: true },
        },
    ],
    rider: { type: mongoose_1.SchemaTypes.Mixed },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret._id;
        },
    },
});
// orderSchema.pre('save', function (next) {
//   console.log('is new', this.isNew);
//   if (this.isNew) {
//     const getNumber = (element: string): string => {
//       var bucket = ``;
//       for (let e = element.length - 4; e < element.length; e++)
//         bucket = bucket.concat(element[e]);
//       return bucket;
//     };
//     this.orderId = `ORD${getNumber(this.senderPhone)}${getNumber(
//       Date.now().toString()
//     )}`;
//   }
//   next();
// });
orderSchema.statics.OrderNumber = (senderPhone) => {
    const getNumber = (element) => {
        // var bucket = ``;
        // for (let e = element.length - 4; e < element.length; e++)
        //   bucket = bucket.concat(element[e]);
        // return bucket;
        return element.slice(element.length - 4);
    };
    const orderId = `ORD${getNumber(senderPhone)}${getNumber(Date.now().toString())}`;
    return orderId;
};
orderSchema.statics.orderCreator = (order) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ORDER.create(order);
});
const ORDER = (0, mongoose_1.model)('Order', orderSchema);
exports.OrderModel = ORDER;

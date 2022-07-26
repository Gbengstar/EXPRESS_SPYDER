import { Schema, model, Document, Models, Model, SchemaTypes } from 'mongoose';

const orderSchema = new Schema(
  {
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
    rider: { type: SchemaTypes.Mixed },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc: any, ret: any) => {
        delete ret._id;
      },
    },
  }
);
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

orderSchema.statics.OrderNumber = (senderPhone: string) => {
  const getNumber = (element: string): string => {
    // var bucket = ``;
    // for (let e = element.length - 4; e < element.length; e++)
    //   bucket = bucket.concat(element[e]);
    // return bucket;
    return element.slice(element.length - 4);
  };

  const orderId = `ORD${getNumber(senderPhone)}${getNumber(
    Date.now().toString()
  )}`;

  return orderId;
};

orderSchema.statics.orderCreator = async (order: Order) => {
  return await ORDER.create(order);
};

export interface Order {
  price?: number;
  pickupAddress?: string;
  deliveryAddress?: string;
  status?: string;
  image?: string;
  orderId?: string;
}

interface OrderSchema extends Document {
  price?: number;
  pickupAddress?: string;
  deliveryAddress?: string;
  status?: string;
  createAt?: string;
  updatedAt?: string;
  image?: string;
  orderId?: string;
}

interface OrderModel extends Model<OrderSchema> {
  orderCreator(order: Order): OrderSchema;
  OrderNumber(phoneNumber: string): string;
}
const ORDER = model<OrderSchema, OrderModel>('Order', orderSchema);

export { ORDER as OrderModel };

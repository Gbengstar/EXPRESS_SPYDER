import { Schema, model, Document, Model } from 'mongoose';

// Schema of the document

const riderSchema = new Schema({
  name: String,
  address: String,
  phoneNumber: String,
});

// interface of the object to be created
export interface RiderDoc {
  name: string;
  address?: string;
  phoneNumber: string;
}

// interface of the Schema i.e the document created
interface RiderSchema extends Document {
  name: string;
  address: string;
  phoneNumber: string;
}
// interface of the model
interface RiderModel extends Model<RiderSchema> {
  createRider(obj: RiderDoc): RiderSchema;
  finderOne(obj: string): RiderSchema[];
}

riderSchema.statics.createRider = (rider: RiderDoc) => {
  return new Rider(rider);
};

riderSchema.statics.finderOne = (rider: RiderDoc) => {
  return Rider.find(rider);
};
const Rider = model<RiderSchema, RiderModel>('Rider', riderSchema);

// const rider = Rider.createRider({
//   firstName: 'gbenga',
//   lastName: 'oyewole',
//   address: 'its a log address',
// });
// const rid = Rider.finderOne({ lastName: 'gbenga' });
export { Rider };

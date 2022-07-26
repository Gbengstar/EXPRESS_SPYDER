import { Schema, model, Document, Models, Model } from 'mongoose';
import { Password } from '../helper/password';

const schaType = { type: String, required: true };
const userSchema = new Schema(
  {
    name: schaType,
    phoneNumber: schaType,
    password: schaType,
    address: String,
  },
  {
    timestamps: true,
  }
);
// interface for document to be created
export interface UserObject {
  name?: string;
  phoneNumber?: string;
  password?: string;
  address?: string;
}

export interface createUser {
  name: string;
  phoneNumber: string;
  password: string;
  address: string;
}
// interface for schema i.e the document outputed by mongodb
interface UserDoc extends Document {
  name?: string;
  phoneNumber?: string;
  password?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

// interface for the model
interface UserModel extends Model<UserDoc> {
  createUser(obj: createUser): UserDoc;
  finderOne(obj: UserObject): UserObject[];
}

userSchema.statics.createUser = (object: createUser) => {
  return new User(object);
};
userSchema.statics.finderOne = async (object: UserObject) => {
  return await User.find(object);
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashedPass = await Password.hashPassword(this.get('password'));
    this.set('password', hashedPass);
  }

  next();
});

const User = model<UserDoc, UserModel>('User', userSchema);
// const user = UserModel.createUser({ name: 'gbenga' });

export { User };

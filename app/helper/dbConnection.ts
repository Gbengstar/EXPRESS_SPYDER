import { connect } from 'mongoose';

export const dbStarter = async () => {
  //   try {
  return await connect('mongodb://localhost:27017/Spyder', {});
  //   } catch (error) {
  //     console.log('error from mongoose', error);
  //   }
};

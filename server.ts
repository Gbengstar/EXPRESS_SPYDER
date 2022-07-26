import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import Session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
import { NotFoundError } from './app/error/not-found-error';
import { dbStarter } from './app/helper/dbConnection';
import { errorHandleMiddleware } from './app/middlewares/errorHandlerController';
import { SignUpRouter } from './app/routes/user/authRoute';
import { redisCaller } from './app/helper/redis';
import cookieParser from 'cookie-parser';
import { OrderRoute } from './app/routes/order/orderRoute';
import { RiderRouter } from './app/routes/rider/riderRoutes';

const app = express(); //as Express
app.use(cookieParser(process.env.SECRET));
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

app.use(express.json());

app.use('/app', SignUpRouter);
app.use('/order', OrderRoute);
app.use('/rider', RiderRouter);

//not found error handler

app.all('*', () => {
  throw new NotFoundError('path not found!', 404);
});

// error handler
app.use(errorHandleMiddleware);

// app.use();
dbStarter().then(async (value: typeof mongoose) => {
  if (value) {
    app.listen(2022, () => console.log('App runing on port 2022!'));
    await redisCaller();
  }
});

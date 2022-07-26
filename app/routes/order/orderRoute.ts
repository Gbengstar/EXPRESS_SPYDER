import { Router, IRouter } from 'express';
import { createOrder } from '../../controller/order/user/createOrder';
import { JWT } from '../../helper/jwt';

const router: IRouter = Router();

router.post('/create', JWT.authenticate, createOrder);

export { router as OrderRoute };

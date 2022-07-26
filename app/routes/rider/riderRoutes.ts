import { signUpRider } from './../../controller/rider/createRider';
import { Router, IRouter } from 'express';
import { JWT } from '../../helper/jwt';
import { logout } from '../../controller/auth/logout';

const router = Router();

router.post('/', signUpRider);

export { router as RiderRouter };

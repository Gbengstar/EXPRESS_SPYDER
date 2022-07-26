import { userAuth } from '../../controller/auth/auth';
import { authMiddleware } from '../../middlewares/authMid';
import { Router, IRouter } from 'express';
import { signUp } from '../../controller/user/createUser';
import { JWT } from '../../helper/jwt';
import { loginController } from '../../controller/auth/login';
import { logout } from '../../controller/auth/logout';

const router: IRouter = Router();
// router.use((req, res, next) => {
//   JWT.authenticate(req, res, next);
// });

// router.use(JWT.authenticate);
router.post('/res', userAuth);
router.post('/signup', signUp);
router.post('/login', loginController);
router.delete('/', JWT.authenticate, logout);

export { router as SignUpRouter };

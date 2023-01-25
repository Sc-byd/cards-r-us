import { Router, Request, Response, NextFunction } from 'express';
import authController from '../controllers/authController';
import oauthController from '../controllers/oauth/oAuthController';
import sessionController from '../controllers/sessionController';

const router = Router();
//POST when user tries to log in
//hash password before it's saved to database
// router.get('/', oauthController.ensureGuest, (req: Request, res: Response) => {
//   console.log('GOTCHA');
//   res.status(200).json(res.locals.user);
// });
// router.get(
//   '/login',
//   // authController.verifyUser,
//   oauthController.ensureGuest,
//   // sessionController.startSession,
//   (req: Request, res: Response) => {
//     console.log('in login grab');
//     res.status(200).json(res.locals.user);
//   }
// );

router.post(
  '/login',
  // authController.verifyUser,
  oauthController.ensureGuest,
  // sessionController.startSession,
  (req: Request, res: Response) => {
    console.log('in login grab');
    res.status(200).json(res.locals.user);
  }
);

// '/signup' Endpoint
router.post(
  '/signup',
  authController.signUp,
  sessionController.startSession,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.user);
  }
);

router.get(
  '/user',
  // sessionController.isLoggedIn,
  oauthController.ensureAuth,
  (req: Request, res: Response, next: NextFunction) => {
    // console.log('in user grab');
    // const { email, username, avatar, name, _id } = res.locals.user;
    // res.status(200).json({ email, username, avatar, name, userId: _id });
    res.status(200);
    next();
  }
);

export default router;
